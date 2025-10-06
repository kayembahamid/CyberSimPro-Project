'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface TrainingModule {
  id: string
  title: string
  description: string
  difficulty: string
  estimatedMinutes: number
  category: string
  totalPoints: number
  totalSteps: number
}

export default function TrainingModules() {
  const [modules, setModules] = useState<TrainingModule[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/training/modules')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setModules(data.data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load modules:', err)
        setLoading(false)
      })
  }, [])

  const getEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'Email Security': '🕵️',
      'Incident Response': '🛡️',
      'Network Security': '🌐',
      'Authentication Security': '🔐'
    }
    return emojiMap[category] || '🎯'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading training modules...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-8"
        >
          ← BACK TO COURSE
        </Link>

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Cybersecurity Training</h1>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <span className={`text-xs px-2 py-1 rounded font-bold mb-2 inline-block ${
                module.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' : 
                module.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {module.difficulty}
              </span>
              
              <div className="flex gap-4 mt-2">
                <div className="text-6xl">{getEmoji(module.category)}</div>
                
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-semibold mb-1">{module.estimatedMinutes} MIN</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-gray-500">🎯 {module.totalPoints} points</span>
                    <span className="text-sm text-gray-500">📝 {module.totalSteps} steps</span>
                  </div>
                  
                  <Link 
                    href={`/dashboard/training/${module.id}/play`}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    START
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">{modules.length}</div>
            <div className="text-sm text-gray-600">Training Modules</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {modules.reduce((sum, m) => sum + m.estimatedMinutes, 0)} min
            </div>
            <div className="text-sm text-gray-600">Total Training Time</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {modules.reduce((sum, m) => sum + m.totalPoints, 0)}
            </div>
            <div className="text-sm text-gray-600">Points to Earn</div>
          </div>
        </div>
      </div>
    </div>
  )
}
