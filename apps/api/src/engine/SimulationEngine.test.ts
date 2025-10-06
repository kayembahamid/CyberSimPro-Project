import { SimulationEngine } from './SimulationEngine'
import { SimulationStep, QuestionType, SimulationStepType } from '../types/simulation.types'

describe('SimulationEngine', () => {
  let engine: SimulationEngine
  let testSteps: SimulationStep[]

  beforeEach(() => {
    testSteps = [
      {
        id: 'step-1',
        type: SimulationStepType.INSTRUCTION,
        title: 'Introduction',
        content: 'Welcome to the test',
        order: 1,
        points: 0
      },
      {
        id: 'step-2',
        type: SimulationStepType.QUESTION,
        title: 'Question 1',
        content: 'What is 2+2?',
        order: 2,
        points: 10,
        question: {
          type: QuestionType.MULTIPLE_CHOICE,
          options: ['2', '3', '4', '5'],
          correctAnswer: 2,
          explanation: '2+2 equals 4'
        }
      },
      {
        id: 'step-3',
        type: SimulationStepType.QUESTION,
        title: 'Question 2',
        content: 'Is the sky blue?',
        order: 3,
        points: 20,
        question: {
          type: QuestionType.TRUE_FALSE,
          correctAnswer: true,
          explanation: 'The sky appears blue'
        }
      }
    ]

    engine = new SimulationEngine(testSteps)
  })

  describe('Initialization', () => {
    it('should initialize with first step', () => {
      const current = engine.getCurrentStep()
      expect(current).toBeDefined()
      expect(current?.id).toBe('step-1')
    })

    it('should start with zero score', () => {
      const progress = engine.getProgress()
      expect(progress.score).toBe(0)
    })

    it('should start at 0% completion', () => {
      const percentage = engine.getProgressPercentage()
      expect(percentage).toBe(0)
    })
  })

  describe('Step Navigation', () => {
    it('should move to next step', () => {
      engine.submitAnswer('step-1', true) // Auto-advance instruction
      engine.moveToNextStep()
      const current = engine.getCurrentStep()
      expect(current?.id).toBe('step-2')
    })

    it('should track completed steps', () => {
      engine.submitAnswer('step-1', true)
      const progress = engine.getProgress()
      expect(progress.completedSteps).toContain('step-1')
    })

    it('should calculate progress percentage correctly', () => {
      engine.submitAnswer('step-1', true)
      const percentage = engine.getProgressPercentage()
      expect(percentage).toBe(33) // 1/3 steps = 33%
    })
  })

  describe('Answer Validation - Multiple Choice', () => {
    beforeEach(() => {
      engine.submitAnswer('step-1', true) // Complete first step
      engine.moveToNextStep() // Move to question
    })

    it('should accept correct answer', () => {
      const result = engine.submitAnswer('step-2', 2)
      expect(result.correct).toBe(true)
      expect(result.pointsEarned).toBe(10)
    })

    it('should reject incorrect answer', () => {
      const result = engine.submitAnswer('step-2', 0)
      expect(result.correct).toBe(false)
      expect(result.pointsEarned).toBe(0)
    })

    it('should provide explanation', () => {
      const result = engine.submitAnswer('step-2', 2)
      expect(result.explanation).toBe('2+2 equals 4')
    })
  })

  describe('Answer Validation - True/False', () => {
    beforeEach(() => {
      engine.submitAnswer('step-1', true)
      engine.moveToNextStep()
      engine.submitAnswer('step-2', 2) // Complete question 1
      engine.moveToNextStep() // Move to T/F question
    })

    it('should accept correct boolean answer', () => {
      const result = engine.submitAnswer('step-3', true)
      expect(result.correct).toBe(true)
      expect(result.pointsEarned).toBe(20)
    })

    it('should reject incorrect boolean answer', () => {
      const result = engine.submitAnswer('step-3', false)
      expect(result.correct).toBe(false)
      expect(result.pointsEarned).toBe(0)
    })
  })

  describe('Scoring', () => {
    it('should accumulate points for correct answers', () => {
      engine.submitAnswer('step-1', true)
      engine.moveToNextStep()
      engine.submitAnswer('step-2', 2) // +10 points
      
      const progress = engine.getProgress()
      expect(progress.score).toBe(10)
    })

    it('should not add points for incorrect answers', () => {
      engine.submitAnswer('step-1', true)
      engine.moveToNextStep()
      engine.submitAnswer('step-2', 0) // Wrong answer
      
      const progress = engine.getProgress()
      expect(progress.score).toBe(0)
    })

    it('should calculate total score across all questions', () => {
      engine.submitAnswer('step-1', true)
      engine.moveToNextStep()
      engine.submitAnswer('step-2', 2) // +10
      engine.moveToNextStep()
      engine.submitAnswer('step-3', true) // +20
      
      const progress = engine.getProgress()
      expect(progress.score).toBe(30)
    })
  })

  describe('Completion Detection', () => {
    it('should detect when simulation is complete', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 2)
      engine.submitAnswer('step-3', true)
      
      expect(engine.isComplete()).toBe(true)
    })

    it('should not be complete with remaining steps', () => {
      engine.submitAnswer('step-1', true)
      expect(engine.isComplete()).toBe(false)
    })
  })

  describe('Results Calculation', () => {
    it('should calculate pass with 70%+ score', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 2) // +10
      engine.submitAnswer('step-3', true) // +20
      
      const results = engine.calculateResults()
      expect(results.passed).toBe(true)
      expect(results.percentageScore).toBe(100)
    })

    it('should calculate fail with <70% score', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 0) // 0 points
      engine.submitAnswer('step-3', false) // 0 points
      
      const results = engine.calculateResults()
      expect(results.passed).toBe(false)
      expect(results.percentageScore).toBe(0)
    })

    it('should provide appropriate feedback for excellent performance', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 2)
      engine.submitAnswer('step-3', true)
      
      const results = engine.calculateResults()
      expect(results.feedback.some(f => f.includes('Perfect'))).toBe(true)
    })

    it('should count correct answers accurately', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 2) // Correct
      engine.submitAnswer('step-3', false) // Incorrect
      
      const results = engine.calculateResults()
      expect(results.correctAnswers).toBe(2) // step-1 and step-2
    })
  })

  describe('Progress Tracking', () => {
    it('should return current step index', () => {
      const progress = engine.getProgress()
      expect(progress.currentStep).toBe(0)
      
      engine.moveToNextStep()
      const newProgress = engine.getProgress()
      expect(newProgress.currentStep).toBe(1)
    })

    it('should provide steps summary', () => {
      const summary = engine.getStepsSummary()
      expect(summary).toHaveLength(3)
      expect(summary[0].completed).toBe(false)
    })

    it('should update steps summary after completion', () => {
      engine.submitAnswer('step-1', true)
      const summary = engine.getStepsSummary()
      expect(summary[0].completed).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle invalid step ID', () => {
      expect(() => {
        engine.submitAnswer('invalid-step', true)
      }).toThrow()
    })

    it('should handle getting hint for non-task step', () => {
      const hint = engine.getHint('step-1')
      expect(hint).toBeNull()
    })

    it('should return next step without moving', () => {
      const nextStep = engine.getNextStep()
      expect(nextStep?.id).toBe('step-2')
      // Current step should not have changed
      expect(engine.getCurrentStep()?.id).toBe('step-1')
    })
  })

  describe('Short Answer Questions', () => {
    beforeEach(() => {
      const stepsWithShortAnswer: SimulationStep[] = [
        {
          id: 'short-answer',
          type: SimulationStepType.QUESTION,
          title: 'Short Answer',
          content: 'What color is the sky?',
          order: 1,
          points: 10,
          question: {
            type: QuestionType.SHORT_ANSWER,
            correctAnswer: 'blue',
            explanation: 'The sky is blue'
          }
        }
      ]
      engine = new SimulationEngine(stepsWithShortAnswer)
    })

    it('should accept correct short answer (case insensitive)', () => {
      const result = engine.submitAnswer('short-answer', 'Blue')
      expect(result.correct).toBe(true)
    })

    it('should accept trimmed answers', () => {
      const result = engine.submitAnswer('short-answer', '  blue  ')
      expect(result.correct).toBe(true)
    })

    it('should reject incorrect short answer', () => {
      const result = engine.submitAnswer('short-answer', 'red')
      expect(result.correct).toBe(false)
    })
  })

  describe('Reset Functionality', () => {
    it('should reset progress', () => {
      engine.submitAnswer('step-1', true)
      engine.submitAnswer('step-2', 2)
      
      engine.reset()
      
      const progress = engine.getProgress()
      expect(progress.score).toBe(0)
      expect(progress.completedSteps).toHaveLength(0)
      expect(progress.currentStep).toBe(0)
    })
  })
})
