'use client'

import { useState, useEffect } from 'react'
import { Sparkles, TrendingUp, Clock, ArrowRight, Lightbulb, Target } from 'lucide-react'

interface Recommendation {
  type: 'module' | 'skill' | 'practice'
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  reason: string
  estimatedTime: number
  moduleId?: string
}

export function AIRecommendationsWidget() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/recommendations')
      const data = await response.json()
      
      if (data.success) {
        setRecommendations(data.data)
      } else {
        setError('Failed to load recommendations')
      }
    } catch (err) {
      setError('Failed to fetch recommendations')
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'module': return <Target className="w-5 h-5" />
      case 'skill': return <TrendingUp className="w-5 h-5" />
      case 'practice': return <Lightbulb className="w-5 h-5" />
      default: return <Sparkles className="w-5 h-5" />
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            <p className="text-sm text-gray-600">Personalized for your learning path</p>
          </div>
        </div>
        <button 
          onClick={fetchRecommendations}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No recommendations yet. Complete more training to get personalized suggestions!</p>
          </div>
        ) : (
          recommendations.map((rec, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-900">
                  <span className="font-medium">Why: </span>
                  {rec.reason}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{rec.estimatedTime} minutes</span>
                </div>
                {rec.moduleId && (
                  <a
                    href={`/dashboard/training/${rec.moduleId}`}
                    className="flex items-center space-x-1 text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <span>Start Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* AI Powered Badge */}
      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="flex items-center justify-center space-x-2 text-xs text-purple-600">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Claude AI</span>
        </div>
      </div>
    </div>
  )
}
