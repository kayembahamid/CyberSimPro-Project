import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CreateSessionData {
  userId: string
  moduleId: string
  moduleName: string
  totalSteps: number
}

interface SaveProgressData {
  stepIndex: number
  stepType: string
  question?: string
  userAnswer?: string
  correctAnswer?: string
  isCorrect?: boolean
  pointsEarned?: number
  attempts?: number
  timeSpent?: number
}

interface UpdateSessionData {
  currentStep?: number
  score?: number
  timeSpent?: number
  status?: 'in_progress' | 'completed' | 'abandoned'
}

export class TrainingSessionService {
  // Create a new training session
  async createSession(data: CreateSessionData) {
    const session = await prisma.trainingSession.create({
      data: {
        userId: data.userId,
        moduleId: data.moduleId,
        moduleName: data.moduleName,
        totalSteps: data.totalSteps,
        status: 'in_progress',
        currentStep: 0,
        timeSpent: 0
      }
    })
    return session
  }

  // Get or create session for a user and module
  async getOrCreateSession(userId: string, moduleId: string, moduleName: string, totalSteps: number) {
    // Check for existing in-progress session
    const existingSession = await prisma.trainingSession.findFirst({
      where: {
        userId,
        moduleId,
        status: 'in_progress'
      },
      include: {
        progress: {
          orderBy: {
            stepIndex: 'asc'
          }
        }
      }
    })

    if (existingSession) {
      // Update last accessed time
      await prisma.trainingSession.update({
        where: { id: existingSession.id },
        data: { lastAccessedAt: new Date() }
      })
      return existingSession
    }

    // Create new session
    return this.createSession({ userId, moduleId, moduleName, totalSteps })
  }

  // Save progress for a specific step
  async saveProgress(sessionId: string, data: SaveProgressData) {
    const progress = await prisma.trainingProgress.upsert({
      where: {
        sessionId_stepIndex: {
          sessionId,
          stepIndex: data.stepIndex
        }
      },
      update: {
        userAnswer: data.userAnswer,
        isCorrect: data.isCorrect,
        pointsEarned: data.pointsEarned ?? 0,
        attempts: data.attempts ?? 1,
        timeSpent: data.timeSpent ?? 0,
        completedAt: new Date()
      },
      create: {
        sessionId,
        stepIndex: data.stepIndex,
        stepType: data.stepType,
        question: data.question,
        userAnswer: data.userAnswer,
        correctAnswer: data.correctAnswer,
        isCorrect: data.isCorrect,
        pointsEarned: data.pointsEarned ?? 0,
        attempts: data.attempts ?? 1,
        timeSpent: data.timeSpent ?? 0,
        completedAt: new Date()
      }
    })

    return progress
  }

  // Update session status and metadata
  async updateSession(sessionId: string, data: UpdateSessionData) {
    const session = await prisma.trainingSession.update({
      where: { id: sessionId },
      data: {
        currentStep: data.currentStep,
        score: data.score,
        timeSpent: data.timeSpent,
        status: data.status,
        completedAt: data.status === 'completed' ? new Date() : undefined,
        lastAccessedAt: new Date()
      }
    })
    return session
  }

  // Complete a training session
  async completeSession(sessionId: string, finalScore: number, totalTimeSpent: number) {
    const session = await prisma.trainingSession.update({
      where: { id: sessionId },
      data: {
        status: 'completed',
        score: finalScore,
        timeSpent: totalTimeSpent,
        completedAt: new Date()
      },
      include: {
        progress: true
      }
    })
    return session
  }

  // Get session by ID
  async getSession(sessionId: string) {
    const session = await prisma.trainingSession.findUnique({
      where: { id: sessionId },
      include: {
        progress: {
          orderBy: {
            stepIndex: 'asc'
          }
        }
      }
    })
    return session
  }

  // Get all sessions for a user
  async getUserSessions(userId: string, options?: {
    moduleId?: string
    status?: string
    limit?: number
    offset?: number
  }) {
    const where: any = { userId }
    if (options?.moduleId) where.moduleId = options.moduleId
    if (options?.status) where.status = options.status

    const sessions = await prisma.trainingSession.findMany({
      where,
      include: {
        progress: {
          select: {
            id: true,
            stepIndex: true,
            isCorrect: true,
            pointsEarned: true,
            completedAt: true
          }
        }
      },
      orderBy: {
        lastAccessedAt: 'desc'
      },
      take: options?.limit,
      skip: options?.offset
    })

    return sessions
  }

  // Get session history/stats for a user
  async getUserStats(userId: string) {
    const [totalSessions, completedSessions, inProgressSessions, totalTimeSpent] = await Promise.all([
      prisma.trainingSession.count({ where: { userId } }),
      prisma.trainingSession.count({ where: { userId, status: 'completed' } }),
      prisma.trainingSession.count({ where: { userId, status: 'in_progress' } }),
      prisma.trainingSession.aggregate({
        where: { userId, status: 'completed' },
        _sum: { timeSpent: true }
      })
    ])

    const recentSessions = await prisma.trainingSession.findMany({
      where: { userId },
      orderBy: { lastAccessedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        moduleId: true,
        moduleName: true,
        status: true,
        score: true,
        currentStep: true,
        totalSteps: true,
        lastAccessedAt: true,
        completedAt: true
      }
    })

    const averageScore = await prisma.trainingSession.aggregate({
      where: { userId, status: 'completed', score: { not: null } },
      _avg: { score: true }
    })

    return {
      totalSessions,
      completedSessions,
      inProgressSessions,
      totalTimeSpent: totalTimeSpent._sum.timeSpent || 0,
      averageScore: Math.round(averageScore._avg.score || 0),
      recentSessions
    }
  }

  // Resume a session - get current state
  async resumeSession(sessionId: string) {
    const session = await prisma.trainingSession.findUnique({
      where: { id: sessionId },
      include: {
        progress: {
          orderBy: {
            stepIndex: 'asc'
          }
        }
      }
    })

    if (!session) {
      throw new Error('Session not found')
    }

    if (session.status !== 'in_progress') {
      throw new Error('Can only resume in-progress sessions')
    }

    // Update last accessed
    await prisma.trainingSession.update({
      where: { id: sessionId },
      data: { lastAccessedAt: new Date() }
    })

    return {
      session,
      currentStep: session.currentStep,
      completedSteps: session.progress.map(p => p.stepIndex),
      progress: session.progress
    }
  }

  // Delete a session (for testing or cleanup)
  async deleteSession(sessionId: string) {
    await prisma.trainingSession.delete({
      where: { id: sessionId }
    })
  }

  // Get module completion stats
  async getModuleStats(userId: string, moduleId: string) {
    const sessions = await prisma.trainingSession.findMany({
      where: { userId, moduleId },
      orderBy: { createdAt: 'desc' }
    })

    const completedSessions = sessions.filter(s => s.status === 'completed')
    const bestScore = completedSessions.length > 0
      ? Math.max(...completedSessions.map(s => s.score || 0))
      : null

    const totalAttempts = sessions.length
    const completedAttempts = completedSessions.length
    const lastAttemptDate = sessions.length > 0 ? sessions[0].lastAccessedAt : null

    return {
      totalAttempts,
      completedAttempts,
      bestScore,
      lastAttemptDate,
      sessions: sessions.map(s => ({
        id: s.id,
        status: s.status,
        score: s.score,
        completedAt: s.completedAt,
        timeSpent: s.timeSpent
      }))
    }
  }
}

export const trainingSessionService = new TrainingSessionService()
