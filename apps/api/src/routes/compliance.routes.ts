import { Router, Request, Response } from 'express';
import { complianceService } from '../services/compliance.service';

const router = Router();

/**
 * GET /api/compliance/report/:framework
 * Get compliance report for specific framework
 */
router.get('/report/:framework', (req: Request, res: Response) => {
  try {
    const { framework } = req.params;
    
    if (!['NIST', 'ISO27001', 'CIS'].includes(framework)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid framework. Must be NIST, ISO27001, or CIS'
      });
    }

    // Mock user status - in production, fetch from database
    const userStatus = {
      userId: 'user-123',
      completedModules: ['phishing-detection-101', 'password-security-basics'],
      totalTrainingHours: 5,
      certificationsEarned: 1
    };

    const report = complianceService.generateReport(
      framework as 'NIST' | 'ISO27001' | 'CIS',
      userStatus
    );

    res.json({
      success: true,
      data: report
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate report'
    });
  }
});

/**
 * GET /api/compliance/gap-analysis
 * Get gap analysis for all frameworks
 */
router.get('/gap-analysis', (req: Request, res: Response) => {
  try {
    const userStatus = {
      userId: 'user-123',
      completedModules: ['phishing-detection-101'],
      totalTrainingHours: 3,
      certificationsEarned: 0
    };

    const analysis = complianceService.getGapAnalysis(userStatus);

    res.json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate gap analysis'
    });
  }
});

/**
 * GET /api/compliance/priority-summary
 * Get priority summary across all frameworks
 */
router.get('/priority-summary', (req: Request, res: Response) => {
  try {
    const userStatus = {
      userId: 'user-123',
      completedModules: ['phishing-detection-101', 'password-security-basics'],
      totalTrainingHours: 5,
      certificationsEarned: 1
    };

    const summary = complianceService.getPrioritySummary(userStatus);

    res.json({
      success: true,
      data: summary
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate priority summary'
    });
  }
});

/**
 * GET /api/compliance/audit-trail
 * Get audit trail for compliance
 */
router.get('/audit-trail', (req: Request, res: Response) => {
  try {
    const userStatus = {
      userId: 'user-123',
      completedModules: ['phishing-detection-101', 'password-security-basics'],
      totalTrainingHours: 5,
      certificationsEarned: 1
    };

    const trail = complianceService.generateAuditTrail(userStatus);

    res.json({
      success: true,
      data: trail
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate audit trail'
    });
  }
});

/**
 * GET /api/compliance/export/:framework
 * Export compliance report
 */
router.get('/export/:framework', (req: Request, res: Response) => {
  try {
    const { framework } = req.params;
    
    if (!['NIST', 'ISO27001', 'CIS'].includes(framework)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid framework'
      });
    }

    const userStatus = {
      userId: 'user-123',
      completedModules: ['phishing-detection-101', 'password-security-basics'],
      totalTrainingHours: 5,
      certificationsEarned: 1
    };

    const exportData = complianceService.exportReport(
      framework as 'NIST' | 'ISO27001' | 'CIS',
      userStatus
    );

    res.json({
      success: true,
      data: exportData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to export report'
    });
  }
});

export default router;
