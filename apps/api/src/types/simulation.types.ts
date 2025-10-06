// Simulation Engine Types

export interface SimulationModule {
  id: string
  title: string
  description: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  estimatedMinutes: number
  category: string
  totalPoints: number
  totalSteps: number
  prerequisites: string[]
  steps: SimulationStep[]
}

export enum SimulationStepType {
  INSTRUCTION = 'INSTRUCTION',
  QUESTION = 'QUESTION',
  TASK = 'TASK',
  ASSESSMENT = 'ASSESSMENT'
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER'
}

export interface SimulationStep {
  id: string
  type: SimulationStepType
  title: string
  content: string
  order: number
  points?: number
  
  // For QUESTION type
  question?: {
    type: QuestionType
    options?: string[]
    correctAnswer: string | number | boolean
    explanation: string
  }
  
  // For TASK type
  task?: {
    instructions: string
    validationCriteria: string[]
    hints?: string[]
  }
}

export interface SimulationProgress {
  simulationId: string
  userId: string
  currentStep: number
  completedSteps: string[]
  answers: Record<string, any>
  score: number
  startedAt: Date
  lastActivityAt: Date
  completedAt?: Date
}

export interface SimulationResult {
  totalSteps: number
  completedSteps: number
  correctAnswers: number
  totalPoints: number
  earnedPoints: number
  percentageScore: number
  passed: boolean
  feedback: string[]
}
