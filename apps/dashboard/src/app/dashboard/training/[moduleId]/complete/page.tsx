'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TrainingCompletePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = parseInt(searchParams.get('score') || '0')

  const getPerformanceLevel = (score: number) => {
    if (score >= 40) return { 
      level: 'Excellent', 
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500'
    }
    if (score >= 25) return { 
      level: 'Good', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500'
    }
    if (score >= 10) return { 
      level: 'Fair', 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500'
    }
    return { 
      level: 'Needs Improvement', 
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500'
    }
  }

  const performance = getPerformanceLevel(score)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 md:p-12">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="text-8xl">🏆</div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Training Complete!
            </h1>
            <p className="text-xl text-gray-600">
              🏆 You've successfully completed this cybersecurity training module
            </p>
          </div>

          {/* Score Card */}
          <div className="bg-blue-600 rounded-lg p-8 my-8 text-center">
            <div className="text-7xl font-bold text-white mb-2">
              {score}
            </div>
            <div className="text-xl text-white font-semibold">Total Points Earned</div>
          </div>

          {/* Performance Badge */}
          <div className={`${performance.bgColor} border-2 ${performance.borderColor} rounded-lg p-6 mb-8`}>
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl">⭐</span>
              <span className={`text-3xl font-bold ${performance.color}`}>
                {performance.level} Performance
              </span>
              <span className="text-4xl">⭐</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">🎖️</div>
              <div className="text-xl font-bold text-gray-900">Level Up</div>
              <div className="text-sm text-gray-600 mt-1">Skill Improved</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">📈</div>
              <div className="text-xl font-bold text-gray-900">+XP</div>
              <div className="text-sm text-gray-600 mt-1">Experience Gained</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-3xl mb-2">🏅</div>
              <div className="text-xl font-bold text-gray-900">Badge</div>
              <div className="text-sm text-gray-600 mt-1">Achievement Unlocked</div>
            </div>
          </div>

          {/* Key Learnings */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✨</span>
              <h3 className="text-2xl font-bold text-gray-900">Key Learnings</h3>
            </div>
            <ul className="space-y-3">
              {[
                'Always verify suspicious requests through a different channel',
                'Never trust unexpected pop-ups or warnings',
                'Report unknown devices to IT security immediately'
              ].map((learning, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                  <span className="text-lg">{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/training"
              className="flex-1 text-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              More Training →
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 text-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Share */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Share your achievement and help others stay cyber-safe! 🛡️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
