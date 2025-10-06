/**
 * Training Content Registry
 * Central hub for all simulation training modules
 */

import phishingDetection101 from './phishing-detection-101'
import ransomwareResponse from './ransomware-response'
import networkSecurityBasics from './network-security-basics'
import passwordSecurityBasics from './password-security-basics'
import { SimulationStep } from '../types/simulation.types'

export interface TrainingModule {
  id: string
  title: string
  description: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  estimatedMinutes: number
  category: string
  steps: SimulationStep[]
  totalPoints: number
  prerequisites?: string[]
}

export const trainingModules: TrainingModule[] = [
  {
    id: 'phishing-detection-101',
    title: 'Phishing Detection 101',
    description: 'Learn to identify and respond to phishing emails. Master the techniques attackers use and how to protect yourself and your organization.',
    difficulty: 'BEGINNER',
    estimatedMinutes: 15,
    category: 'Email Security',
    steps: phishingDetection101,
    totalPoints: 65,
    prerequisites: []
  },
  {
    id: 'ransomware-response',
    title: 'Ransomware Response Training',
    description: 'Understand how to recognize, respond to, and recover from ransomware attacks. Learn critical incident response procedures.',
    difficulty: 'INTERMEDIATE',
    estimatedMinutes: 12,
    category: 'Incident Response',
    steps: ransomwareResponse,
    totalPoints: 60,
    prerequisites: ['phishing-detection-101']
  },
  {
    id: 'network-security-basics',
    title: 'Network Security Fundamentals',
    description: 'Master essential network security concepts including Wi-Fi safety, password management, and secure browsing practices.',
    difficulty: 'BEGINNER',
    estimatedMinutes: 15,
    category: 'Network Security',
    steps: networkSecurityBasics,
    totalPoints: 65,
    prerequisites: []
  },
  {
    id: 'password-security-basics',
    title: 'Password Security & Authentication',
    description: 'Master password creation, management, and multi-factor authentication best practices.',
    difficulty: 'BEGINNER',
    estimatedMinutes: 15,
    category: 'Authentication Security',
    steps: passwordSecurityBasics,
    totalPoints: 70,
    prerequisites: []
  }
]

/**
 * Get module by ID
 */
export function getModuleById(moduleId: string): TrainingModule | undefined {
  return trainingModules.find(m => m.id === moduleId)
}

/**
 * Get all modules
 */
export function getAllModules(): TrainingModule[] {
  return trainingModules
}

/**
 * Get modules by difficulty
 */
export function getModulesByDifficulty(difficulty: string): TrainingModule[] {
  return trainingModules.filter(m => m.difficulty === difficulty)
}

/**
 * Get modules by category
 */
export function getModulesByCategory(category: string): TrainingModule[] {
  return trainingModules.filter(m => m.category === category)
}

/**
 * Get total training content stats
 */
export function getContentStats() {
  return {
    totalModules: trainingModules.length,
    totalSteps: trainingModules.reduce((sum, m) => sum + m.steps.length, 0),
    totalPoints: trainingModules.reduce((sum, m) => sum + m.totalPoints, 0),
    categories: [...new Set(trainingModules.map(m => m.category))],
    difficulties: [...new Set(trainingModules.map(m => m.difficulty))]
  }
}

export default {
  modules: trainingModules,
  getModuleById,
  getAllModules,
  getModulesByDifficulty,
  getModulesByCategory,
  getContentStats
}
