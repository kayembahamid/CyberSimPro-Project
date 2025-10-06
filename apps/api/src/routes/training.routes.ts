import { Router } from 'express';
import { Request, Response } from 'express';
import { getAllModules, getModuleById, getContentStats } from '../content';
import { SimulationEngine } from '../engine/SimulationEngine';
import { SimulationProgress } from '../types/simulation.types';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const router = Router();

// In-memory storage for active simulations (in production, use Redis or database)
const activeSimulations = new Map<string, SimulationEngine>();

/**
 * GET /api/training/modules
 * Get all available training modules
 */
router.get('/modules', (req: Request, res: Response) => {
  try {
    const modules = getAllModules();
    res.json({
      success: true,
      data: modules.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        difficulty: m.difficulty,
        estimatedMinutes: m.estimatedMinutes,
        category: m.category,
        totalPoints: m.totalPoints,
        totalSteps: m.steps.length,
        prerequisites: m.prerequisites
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch training modules'
    });
  }
});

/**
 * GET /api/training/modules/:moduleId
 * Get specific training module details
 */
router.get('/modules/:moduleId', (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const module = getModuleById(moduleId);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Training module not found'
      });
    }

    res.json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch training module'
    });
  }
});

/**
 * GET /api/training/stats
 * Get training content statistics
 */
router.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = getContentStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stats'
    });
  }
});

/**
 * POST /api/training/start/:moduleId
 * Start a new simulation session
 */
router.post('/start/:moduleId', (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const { userId = 'guest', simulationId } = req.body;

    const module = getModuleById(moduleId);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        error: 'Training module not found'
      });
    }

    // Create new simulation engine
    const engine = new SimulationEngine(module.steps);
    const sessionId = simulationId || `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store engine in memory
    activeSimulations.set(sessionId, engine);

    // Get first step
    const firstStep = engine.getCurrentStep();
    const progress = engine.getProgress();

    res.json({
      success: true,
      data: {
        sessionId,
        moduleId,
        currentStep: firstStep,
        progress: {
          currentStepIndex: progress.currentStep,
          completedSteps: progress.completedSteps.length,
          totalSteps: module.steps.length,
          score: progress.score,
          progressPercentage: engine.getProgressPercentage()
        },
        stepsSummary: engine.getStepsSummary()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start simulation'
    });
  }
});

/**
 * POST /api/training/answer/:sessionId
 * Submit answer for current step
 */
router.post('/answer/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { stepId, answer } = req.body;

    const engine = activeSimulations.get(sessionId);
    
    if (!engine) {
      return res.status(404).json({
        success: false,
        error: 'Simulation session not found'
      });
    }

    // Submit answer
    const result = engine.submitAnswer(stepId, answer);
    
    // Move to next step if answer was correct
    if (result.correct) {
      engine.moveToNextStep();
    }

    // Get updated state
    const currentStep = engine.getCurrentStep();
    const progress = engine.getProgress();
    const isComplete = engine.isComplete();

    let finalResults = null;
    if (isComplete) {
      finalResults = engine.calculateResults();
      // Clean up session
      activeSimulations.delete(sessionId);
    }

    res.json({
      success: true,
      data: {
        answerResult: result,
        currentStep,
        progress: {
          currentStepIndex: progress.currentStep,
          completedSteps: progress.completedSteps.length,
          score: progress.score,
          progressPercentage: engine.getProgressPercentage()
        },
        isComplete,
        finalResults,
        stepsSummary: engine.getStepsSummary()
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit answer'
    });
  }
});

/**
 * GET /api/training/progress/:sessionId
 * Get current simulation progress
 */
router.get('/progress/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const engine = activeSimulations.get(sessionId);
    
    if (!engine) {
      return res.status(404).json({
        success: false,
        error: 'Simulation session not found'
      });
    }

    const currentStep = engine.getCurrentStep();
    const progress = engine.getProgress();

    res.json({
      success: true,
      data: {
        currentStep,
        progress: {
          currentStepIndex: progress.currentStep,
          completedSteps: progress.completedSteps.length,
          score: progress.score,
          progressPercentage: engine.getProgressPercentage()
        },
        stepsSummary: engine.getStepsSummary(),
        isComplete: engine.isComplete()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress'
    });
  }
});

/**
 * GET /api/training/hint/:sessionId/:stepId
 * Get hint for specific step
 */
router.get('/hint/:sessionId/:stepId', (req: Request, res: Response) => {
  try {
    const { sessionId, stepId } = req.params;
    const engine = activeSimulations.get(sessionId);
    
    if (!engine) {
      return res.status(404).json({
        success: false,
        error: 'Simulation session not found'
      });
    }

    const hint = engine.getHint(stepId);

    res.json({
      success: true,
      data: { hint }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch hint'
    });
  }
});

/**
 * DELETE /api/training/session/:sessionId
 * End simulation session
 */
router.delete('/session/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const engine = activeSimulations.get(sessionId);
    
    if (!engine) {
      return res.status(404).json({
        success: false,
        error: 'Simulation session not found'
      });
    }

    // Get final results before cleanup
    const results = engine.calculateResults();
    
    // Clean up
    activeSimulations.delete(sessionId);

    res.json({
      success: true,
      data: {
        message: 'Session ended',
        finalResults: results
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to end session'
    });
  }
});

/**
 * GET /api/training/:moduleId/game
 * Get game content for Banzai-style training
 */
router.get('/:moduleId/game', (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    
    // Load from JSON file first
    try {
      const jsonPath = path.join(__dirname, '../content/training-modules.json');
      const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
      const trainingData = JSON.parse(jsonContent);
      
      const jsonModule = trainingData.modules.find((m: any) => m.id === moduleId);
      if (jsonModule) {
        return res.json({
          success: true,
          module: jsonModule,
          steps: jsonModule.steps
        });
      }
    } catch (jsonError) {
      console.log('JSON file not found, falling back to module system');
    }
    
    const module = getModuleById(moduleId);
    
    if (!module) {
      // Return mock game steps for demo
      const mockSteps = [
        {
          type: 'story',
          content: '🐉 A dragon is attacking the Kingdom of the Internet. This beast is burning villages, downloading viruses, and stealing identities. Legend tells of a brave knight who will protect us. And that knight is you!'
        },
        {
          type: 'question',
          question: 'You receive an email from your boss asking for your password urgently. What should you do?',
          options: [
            'Send the password immediately - my boss needs it!',
            'Verify with your boss in person or via phone before sharing',
            'Reply asking why they need it',
            'Ignore the email completely'
          ],
          correctAnswer: 1,
          points: 10,
          explanation: 'Perfect! Always verify requests for sensitive information through a different communication channel.'
        },
        {
          type: 'story',
          content: '⚔️ Well done, brave knight! The dragon attacks again...'
        }
      ];

      return res.json({
        success: true,
        steps: mockSteps
      });
    }

    // Convert module steps to game format
    const gameSteps = module.steps.map((step: any) => ({
      type: step.type === 'challenge' ? 'question' : 'story',
      content: step.content,
      question: step.question,
      options: step.options,
      correctAnswer: step.correctAnswer,
      points: step.points || 10,
      explanation: step.explanation
    }));

    res.json({
      success: true,
      steps: gameSteps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game content'
    });
  }
});

/**
 * POST /api/training/progress
 * Save training progress
 */
router.post('/progress', async (req: Request, res: Response) => {
  try {
    const { moduleId, stepId, completed, score, timeSpent } = req.body;
    const userId = req.user?.id || 'demo-user'; // Get from auth middleware

    // Save progress to database
    const progress = await prisma.trainingProgress.upsert({
      where: {
        userId_moduleId_stepId: {
          userId,
          moduleId,
          stepId
        }
      },
      update: {
        score: Math.max(score || 0, 0), // Keep best score
        completed,
        attempts: { increment: 1 },
        timeSpent: { increment: timeSpent || 0 },
        completedAt: completed ? new Date() : null,
        updatedAt: new Date()
      },
      create: {
        userId,
        moduleId,
        stepId,
        score: score || 0,
        completed,
        attempts: 1,
        timeSpent: timeSpent || 0,
        completedAt: completed ? new Date() : null
      }
    });

    // Calculate overall module stats
    const allProgress = await prisma.trainingProgress.findMany({
      where: { userId, moduleId }
    });

    const totalSteps = allProgress.length;
    const completedSteps = allProgress.filter((p: any) => p.completed).length;
    const completionPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
    const totalScore = allProgress.reduce((sum: number, p: any) => sum + p.score, 0);

    // Determine badge level
    const getBadge = (percentage: number) => {
      if (percentage === 100) return 'GOLD';
      if (percentage >= 50) return 'SILVER';
      if (percentage > 0) return 'BRONZE';
      return 'NONE';
    };

    res.json({
      success: true,
      progress,
      moduleStats: {
        completionPercentage,
        totalScore,
        completedSteps,
        totalSteps,
        badge: getBadge(completionPercentage)
      }
    });
  } catch (error) {
    console.error('Progress save error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save progress'
    });
  }
});

/**
 * POST /api/training/complete
 * Mark training module as complete
 */
router.post('/complete', async (req: Request, res: Response) => {
  try {
    const { moduleId, score, timeSpent } = req.body;
    const userId = req.user?.id || 'demo-user';

    // Mark all steps as completed
    const allProgress = await prisma.trainingProgress.findMany({
      where: { userId, moduleId }
    });

    // Calculate completion percentage
    const completedSteps = allProgress.filter((p: any) => p.completed).length;
    const totalSteps = allProgress.length;
    const completionPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    // Determine badge
    let badge = 'NONE';
    if (completionPercentage === 100) badge = 'GOLD';
    else if (completionPercentage >= 50) badge = 'SILVER';
    else if (completionPercentage > 0) badge = 'BRONZE';

    res.json({
      success: true,
      message: 'Training completed',
      data: {
        moduleId,
        score,
        timeSpent,
        completionPercentage,
        badge,
        completedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Completion save error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save completion'
    });
  }
});

export default router;
