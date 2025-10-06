import {
  SimulationStep,
  SimulationStepType,
  QuestionType,
  SimulationProgress,
  SimulationResult
} from '../types/simulation.types'

export class SimulationEngine {
  private steps: SimulationStep[]
  private progress: SimulationProgress

  constructor(steps: SimulationStep[], existingProgress?: SimulationProgress) {
    this.steps = steps.sort((a, b) => a.order - b.order)
    this.progress = existingProgress || this.initializeProgress()
  }

  private initializeProgress(): SimulationProgress {
    return {
      simulationId: '',
      userId: '',
      currentStep: 0,
      completedSteps: [],
      answers: {},
      score: 0,
      startedAt: new Date(),
      lastActivityAt: new Date()
    }
  }

  /**
   * Get current step
   */
  getCurrentStep(): SimulationStep | null {
    return this.steps[this.progress.currentStep] || null
  }

  /**
   * Get step by ID
   */
  getStepById(stepId: string): SimulationStep | null {
    return this.steps.find(s => s.id === stepId) || null
  }

  /**
   * Submit answer for current step
   */
  submitAnswer(stepId: string, answer: any): {
    correct: boolean
    pointsEarned: number
    explanation?: string
    nextStepId?: string
  } {
    const step = this.getStepById(stepId)
    
    if (!step) {
      throw new Error('Step not found')
    }

    // Record answer
    this.progress.answers[stepId] = answer
    this.progress.lastActivityAt = new Date()

    // Validate answer based on step type
    let correct = false
    let pointsEarned = 0
    let explanation = ''

    if (step.type === SimulationStepType.QUESTION && step.question) {
      const result = this.validateQuestion(step, answer)
      correct = result.correct
      explanation = result.explanation
      pointsEarned = result.correct ? (step.points || 0) : 0
    } else if (step.type === SimulationStepType.TASK && step.task) {
      const result = this.validateTask(step, answer)
      correct = result.correct
      pointsEarned = result.correct ? (step.points || 0) : 0
    } else {
      // INSTRUCTION or ASSESSMENT steps are auto-completed
      correct = true
      pointsEarned = step.points || 0
    }

    // Update progress
    if (correct && !this.progress.completedSteps.includes(stepId)) {
      this.progress.completedSteps.push(stepId)
      this.progress.score += pointsEarned
    }

    // Get next step
    const nextStep = this.getNextStep()

    return {
      correct,
      pointsEarned,
      explanation,
      nextStepId: nextStep?.id
    }
  }

  /**
   * Validate question answer
   */
  private validateQuestion(step: SimulationStep, answer: any): {
    correct: boolean
    explanation: string
  } {
    if (!step.question) {
      return { correct: false, explanation: 'Invalid question' }
    }

    const { type, correctAnswer, explanation } = step.question
    let correct = false

    switch (type) {
      case QuestionType.MULTIPLE_CHOICE:
        correct = answer === correctAnswer
        break
      
      case QuestionType.TRUE_FALSE:
        correct = answer === correctAnswer
        break
      
      case QuestionType.SHORT_ANSWER:
        // Case-insensitive comparison with trim
        const userAnswer = String(answer).trim().toLowerCase()
        const correctAnswerNormalized = String(correctAnswer).trim().toLowerCase()
        correct = userAnswer === correctAnswerNormalized
        break
    }

    return { correct, explanation }
  }

  /**
   * Validate task completion
   */
  private validateTask(step: SimulationStep, answer: any): {
    correct: boolean
  } {
    if (!step.task) {
      return { correct: false }
    }

    // For MVP, we'll accept any answer as correct for tasks
    // In production, this would validate against specific criteria
    return { correct: true }
  }

  /**
   * Move to next step
   */
  moveToNextStep(): SimulationStep | null {
    if (this.hasNextStep()) {
      this.progress.currentStep++
      this.progress.lastActivityAt = new Date()
      return this.getCurrentStep()
    }
    return null
  }

  /**
   * Get next step without moving
   */
  getNextStep(): SimulationStep | null {
    if (this.hasNextStep()) {
      return this.steps[this.progress.currentStep + 1]
    }
    return null
  }

  /**
   * Check if there's a next step
   */
  hasNextStep(): boolean {
    return this.progress.currentStep < this.steps.length - 1
  }

  /**
   * Check if simulation is complete
   */
  isComplete(): boolean {
    return this.progress.completedSteps.length === this.steps.length
  }

  /**
   * Calculate final results
   */
  calculateResults(): SimulationResult {
    const totalSteps = this.steps.length
    const completedSteps = this.progress.completedSteps.length
    const totalPoints = this.steps.reduce((sum, step) => sum + (step.points || 0), 0)
    const earnedPoints = this.progress.score
    const percentageScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0
    const passed = percentageScore >= 70 // 70% passing grade

    // Generate feedback
    const feedback: string[] = []
    
    if (passed) {
      feedback.push('🎉 Congratulations! You passed the simulation.')
    } else {
      feedback.push('Keep practicing! Review the incorrect answers and try again.')
    }

    if (percentageScore === 100) {
      feedback.push('Perfect score! You demonstrated excellent understanding.')
    } else if (percentageScore >= 90) {
      feedback.push('Excellent work! You have strong grasp of the concepts.')
    } else if (percentageScore >= 80) {
      feedback.push('Good job! Minor improvements would make you an expert.')
    } else if (percentageScore >= 70) {
      feedback.push('You passed, but there\'s room for improvement.')
    }

    // Count correct answers
    const correctAnswers = this.progress.completedSteps.length

    // Mark as completed
    if (this.isComplete() && !this.progress.completedAt) {
      this.progress.completedAt = new Date()
    }

    return {
      totalSteps,
      completedSteps,
      correctAnswers,
      totalPoints,
      earnedPoints,
      percentageScore: Math.round(percentageScore),
      passed,
      feedback
    }
  }

  /**
   * Get current progress
   */
  getProgress(): SimulationProgress {
    return { ...this.progress }
  }

  /**
   * Get progress percentage
   */
  getProgressPercentage(): number {
    return Math.round((this.progress.completedSteps.length / this.steps.length) * 100)
  }

  /**
   * Reset simulation
   */
  reset(): void {
    this.progress = this.initializeProgress()
  }

  /**
   * Get hint for current step
   */
  getHint(stepId: string): string | null {
    const step = this.getStepById(stepId)
    if (step && step.task && step.task.hints && step.task.hints.length > 0) {
      // Return first available hint
      return step.task.hints[0]
    }
    return null
  }

  /**
   * Get all steps summary
   */
  getStepsSummary(): Array<{
    id: string
    title: string
    type: SimulationStepType
    completed: boolean
  }> {
    return this.steps.map(step => ({
      id: step.id,
      title: step.title,
      type: step.type,
      completed: this.progress.completedSteps.includes(step.id)
    }))
  }
}
