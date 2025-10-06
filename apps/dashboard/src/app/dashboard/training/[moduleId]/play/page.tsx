'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface GameStep {
  type: 'story' | 'question' | 'email_scenario' | 'character_intro' | 'demographic' | 'assessment_intro' | 'scenario' | 'dialogue'
  content?: string
  image?: string
  question?: string
  options?: any[]
  correctAnswer?: number
  points?: number
  explanation?: string
  feedback?: string
  nextButton?: string
  email?: any
  helper?: any
  character?: string
  dialogue?: string
  title?: string
  nextText?: string
}

export default function TrainingGame() {
  const params = useParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)
  const [wrongTurns, setWrongTurns] = useState(0)
  const [wallet, setWallet] = useState(110)
  const [cyberCoins, setCyberCoins] = useState(12)
  const [daysRemaining, setDaysRemaining] = useState([5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  const [gameSteps, setGameSteps] = useState<GameStep[]>([])
  const [loading, setLoading] = useState(true)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    fetchGameContent()
  }, [])

  const fetchGameContent = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/training/${params.moduleId}/game`)
      const data = await response.json()
      
      if (data.success && data.steps) {
        setGameSteps(data.steps)
      }
      setLoading(false)
    } catch (error) {
      console.error('Failed to load game:', error)
      setLoading(false)
    }
  }

  const handleAnswer = (selectedIndex: number) => {
    const step = gameSteps[currentStep]
    const selectedOption = step.options?.[selectedIndex]
    
    if (selectedOption.correct) {
      setIsCorrect(true)
      setFeedbackText(selectedOption.feedback || step.explanation || 'Correct!')
      setScore(score + (step.points || selectedOption.points || 10))
      setWallet(wallet + (step.points || selectedOption.points || 10))
      setCyberCoins(cyberCoins + 2)
      if (daysRemaining.length > 0) {
        setDaysRemaining(daysRemaining.slice(1))
      }
    } else {
      setIsCorrect(false)
      setFeedbackText(selectedOption.feedback || 'Not quite right. Try reviewing the material.')
      setWrongTurns(wrongTurns + 1)
    }
    
    setShowFeedback(true)
  }

  const handleNext = () => {
    setShowFeedback(false)
    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push(`/dashboard/training/${params.moduleId}/complete?score=${score}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading training...</p>
        </div>
      </div>
    )
  }

  const step = gameSteps[currentStep]

  return (
    <div className="min-h-screen bg-white">
      {/* Banzai-Style Stats Bar */}
      <div className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            {/* Wrong Turns */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-gray-700">WRONG TURNS</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`text-xl ${i < wrongTurns ? 'grayscale' : ''}`}>
                    💀
                  </div>
                ))}
                {wrongTurns > 0 && <span className="text-red-500 ml-1">✏️</span>}
              </div>
            </div>

            {/* Wallet */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-gray-700">WALLET</span>
              <span className="text-lg">💵</span>
              <span className="font-bold text-lg">${wallet}</span>
            </div>

            {/* Cyber Coins */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-gray-700">CYBER COINS</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all" 
                  style={{ width: `${(cyberCoins / 100) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium">{cyberCoins}/100</span>
            </div>

            {/* Days Remaining */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-gray-700">DAYS REMAINING</span>
              <div className="flex gap-1">
                {daysRemaining.slice(0, 4).map((day, i) => (
                  <div key={i} className="w-7 h-7 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded">
                    ✏️
                  </div>
                ))}
                {daysRemaining.slice(4, 10).map((day, i) => (
                  <div key={i} className="w-7 h-7 border border-gray-300 flex items-center justify-center text-xs rounded">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {!showFeedback ? (
          <>
            {step?.type === 'story' && (
              <div className="text-center max-w-2xl mx-auto">
                {step.image && (
                  <div className="mb-8">
                    <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                      {step.image}
                    </div>
                  </div>
                )}
                <p className="text-xl text-gray-800 leading-relaxed mb-8">{step.content}</p>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  {step.nextButton || 'Continue'}
                </button>
              </div>
            )}

            {step?.type === 'question' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">{step.question}</h2>
                <div className="space-y-3">
                  {step.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full text-left p-4 border-2 border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition text-lg font-medium text-gray-800"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step?.type === 'email_scenario' && (
              <div>
                {/* Email Display */}
                <div className="bg-white border-2 border-gray-300 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.email?.from?.[0] || 'E'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">From: {step.email?.from}</div>
                      <div className="text-sm text-gray-600">Subject: {step.email?.subject}</div>
                    </div>
                  </div>
                  <p className="text-gray-800">{step.email?.body}</p>
                  {step.email?.hasLink && (
                    <span className="text-blue-600 underline cursor-pointer">this link</span>
                  )}
                </div>

                {/* Helper Tip */}
                {step.helper && (
                  <div className="flex gap-3 mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 max-w-2xl mx-auto">
                    <div className="text-3xl">📱</div>
                    <div>
                      <div className="font-bold text-sm text-yellow-900">{step.helper.name}</div>
                      <p className="text-sm text-yellow-800">{step.helper.tip}</p>
                    </div>
                  </div>
                )}

                {/* Question */}
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{step.question}</h3>
                  <div className="space-y-3">
                    {step.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full text-left p-4 border-2 border-gray-300 rounded-full hover:border-blue-500 transition text-lg"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Feedback Screen */
          <div className={`max-w-2xl mx-auto text-center p-8 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
            <div className="text-7xl mb-4">{isCorrect ? '✅' : '❌'}</div>
            <h3 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </h3>
            <p className="text-xl text-gray-800 mb-6">{feedbackText}</p>
            {isCorrect && (
              <div className="bg-white rounded-lg p-4 mb-6 border-2 border-green-500">
                <p className="text-green-700 font-bold">
                  🎉 +{step.points || 10} points • +${step.points || 10} • +2 Cyber Coins
                </p>
              </div>
            )}
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              {currentStep < gameSteps.length - 1 ? 'Continue' : 'Complete Training'}
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-gray-600">Step {currentStep + 1} of {gameSteps.length}</span>
            <span className="font-bold text-gray-900">Score: {score} points</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all" 
              style={{ width: `${((currentStep + 1) / gameSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
