'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ErrorMessage } from '@/components/error-message'
import ReactMarkdown from 'react-markdown'

interface SimulationStep {
  id: string
  type: string
  title: string
  content: string
  order: number
  points?: number
  question?: {
    type: string
    options?: string[]
    correctAnswer: string | number | boolean
    explanation: string
  }
  task?: {
    instructions: string
    validationCriteria: string[]
    hints?: string[]
  }
}

interface Progress {
  currentStepIndex: number
  completedSteps: number
  score: number
  progressPercentage: number
}

export default function SimulationPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<SimulationStep | null>(null)
  const [progress, setProgress] = useState<Progress | null>(null)
  const [answer, setAnswer] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [finalResults, setFinalResults] = useState<any>(null)

  // Start simulation
  useEffect(() => {
    startSimulation()
  }, [])

  async function startSimulation() {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3003/api/training/start/${moduleId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user' })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSessionId(data.data.sessionId)
        setCurrentStep(data.data.currentStep)
        setProgress(data.data.progress)
      } else {
        setError('Failed to start training session')
      }
    } catch (err) {
      setError('Failed to connect to training service')
    } finally {
      setLoading(false)
    }
  }

  async function submitAnswer() {
    if (!sessionId || !currentStep || answer === null) return

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3003/api/training/answer/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stepId: currentStep.id,
          answer: answer
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setFeedback(data.data.answerResult)
        setShowFeedback(true)
        setProgress(data.data.progress)
        
        if (data.data.isComplete) {
          setIsComplete(true)
          setFinalResults(data.data.finalResults)
        } else {
          // Will move to next step after feedback
          setCurrentStep(data.data.currentStep)
        }
      }
    } catch (err) {
      setError('Failed to submit answer')
    } finally {
      setLoading(false)
    }
  }

  function nextStep() {
    setShowFeedback(false)
    setAnswer(null)
    setFeedback(null)
  }

  if (loading && !currentStep) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <ErrorMessage message={error} />
        <Button onClick={() => router.push('/dashboard/training')} className="mt-4">
          Back to Training
        </Button>
      </div>
    )
  }

  if (isComplete && finalResults) {
    const passed = finalResults.passed
    
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className={passed ? 'border-green-500' : 'border-yellow-500'}>
          <CardHeader className={passed ? 'bg-green-50' : 'bg-yellow-50'}>
            <CardTitle className="text-center text-2xl">
              {passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                {finalResults.percentageScore}%
              </div>
              <div className="text-gray-600">Final Score</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">
                  {finalResults.earnedPoints}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">
                  {finalResults.completedSteps}/{finalResults.totalSteps}
                </div>
                <div className="text-sm text-gray-600">Steps Completed</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Feedback:</h3>
              {finalResults.feedback.map((item: string, index: number) => (
                <p key={index} className="text-sm text-gray-700">
                  {item}
                </p>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => router.push('/dashboard/training')}
                className="flex-1"
              >
                Back to Training
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Retake Module
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentStep) return null

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      {progress && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {progress.progressPercentage}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress.progressPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">
                Step {progress.currentStepIndex + 1}
              </span>
              <span className="text-sm font-medium text-blue-600">
                Score: {progress.score} points
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Step */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{currentStep.type}</Badge>
            {currentStep.points && (
              <span className="text-sm text-gray-600">
                {currentStep.points} points
              </span>
            )}
          </div>
          <CardTitle className="text-2xl mt-2">{currentStep.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{currentStep.content}</ReactMarkdown>
          </div>

          {/* Question UI */}
          {currentStep.question && !showFeedback && (
            <div className="space-y-4">
              {currentStep.question.type === 'MULTIPLE_CHOICE' && (
                <div className="space-y-2">
                  {currentStep.question.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setAnswer(index)}
                      className={`w-full text-left p-4 rounded border-2 transition-colors ${
                        answer === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentStep.question.type === 'TRUE_FALSE' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setAnswer(true)}
                    className={`flex-1 p-4 rounded border-2 transition-colors ${
                      answer === true
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    True
                  </button>
                  <button
                    onClick={() => setAnswer(false)}
                    className={`flex-1 p-4 rounded border-2 transition-colors ${
                      answer === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    False
                  </button>
                </div>
              )}

              {currentStep.question.type === 'SHORT_ANSWER' && (
                <input
                  type="text"
                  value={answer || ''}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full p-4 border-2 border-gray-200 rounded focus:border-blue-500 outline-none"
                />
              )}

              <Button
                onClick={submitAnswer}
                disabled={answer === null || loading}
                className="w-full"
              >
                {loading ? 'Submitting...' : 'Submit Answer'}
              </Button>
            </div>
          )}

          {/* Task UI */}
          {currentStep.task && !showFeedback && (
            <div className="space-y-4">
              <textarea
                value={answer || ''}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your response..."
                className="w-full p-4 border-2 border-gray-200 rounded min-h-32 focus:border-blue-500 outline-none"
              />
              <Button
                onClick={submitAnswer}
                disabled={!answer || loading}
                className="w-full"
              >
                {loading ? 'Submitting...' : 'Submit Response'}
              </Button>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && feedback && (
            <div className={`p-6 rounded-lg ${
              feedback.correct ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{feedback.correct ? '✅' : '❌'}</span>
                <span className={`font-semibold ${
                  feedback.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedback.correct ? 'Correct!' : 'Incorrect'}
                </span>
                {feedback.pointsEarned > 0 && (
                  <span className="ml-auto text-green-600 font-medium">
                    +{feedback.pointsEarned} points
                  </span>
                )}
              </div>
              
              {feedback.explanation && (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{feedback.explanation}</ReactMarkdown>
                </div>
              )}

              <Button onClick={nextStep} className="w-full mt-4">
                Continue to Next Step
              </Button>
            </div>
          )}

          {/* Instruction/Assessment - Auto continue */}
          {(currentStep.type === 'INSTRUCTION' || currentStep.type === 'ASSESSMENT') && !showFeedback && (
            <Button
              onClick={() => {
                setAnswer(true)
                submitAnswer()
              }}
              className="w-full"
            >
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
