import { Router, Request, Response } from 'express';
import { aiRecommendationService } from '../services/ai-recommendation.service';

const router = Router();

/**
 * GET /api/recommendations
 * Get AI-powered personalized recommendations
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 'guest';
    
    // Build user profile from database
    // In production, fetch from TrainingSession, scores, etc.
    const userProfile = {
      userId,
      completedModules: ['phishing-detection-101'],
      scores: [
        { moduleId: 'phishing-detection-101', score: 85 }
      ],
      timeSpent: 1800, // 30 minutes in seconds
      weakAreas: ['passwords', 'network'],
      strengths: ['phishing detection']
    };

    const recommendations = await aiRecommendationService.generateRecommendations(userProfile);

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate recommendations'
    });
  }
});

/**
 * GET /api/recommendations/learning-path
 * Get AI analysis of user's learning path
 */
router.get('/learning-path', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id || 'guest';
    
    const userProfile = {
      userId,
      completedModules: ['phishing-detection-101'],
      scores: [
        { moduleId: 'phishing-detection-101', score: 85 }
      ],
      timeSpent: 1800,
      weakAreas: ['passwords'],
      strengths: ['email security']
    };

    const analysis = await aiRecommendationService.analyzeLearningPath(userProfile);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze learning path'
    });
  }
});

/**
 * POST /api/recommendations/practice-question
 * Generate AI-powered practice question
 */
router.post('/practice-question', async (req: Request, res: Response) => {
  try {
    const { weakArea } = req.body;
    
    if (!weakArea) {
      return res.status(400).json({
        success: false,
        error: 'weakArea is required'
      });
    }

    const question = await aiRecommendationService.generatePracticeQuestion(weakArea);

    res.json({
      success: true,
      data: question
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate question'
    });
  }
});

export default router;
