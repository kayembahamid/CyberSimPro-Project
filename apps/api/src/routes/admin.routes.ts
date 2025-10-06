import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /api/admin/employee-progress
 * Get all employees with their training progress
 */
router.get('/employee-progress', async (req: Request, res: Response) => {
  try {
    const { department, status, search } = req.query;

    // Get all users (employees)
    const users = await prisma.user.findMany({
      where: {
        role: { in: ['EMPLOYEE', 'TRAINEE'] },
        ...(department && department !== 'all' ? { 
          // Assuming we store department in user metadata or separate field
        } : {})
      },
      include: {
        trainingProgress: true
      }
    });

    // Process each employee's progress
    const employees = users.map(user => {
      const progress = user.trainingProgress;
      
      // Calculate module completion
      const modules = {
        'phishing-detective': calculateModuleCompletion(progress, 'phishing-detective'),
        'password-guardian': calculateModuleCompletion(progress, 'password-guardian'),
        'malware-defender': calculateModuleCompletion(progress, 'malware-defender'),
        'social-engineer-spotter': calculateModuleCompletion(progress, 'social-engineer-spotter')
      };

      // Calculate overall progress (average of all modules)
      const moduleValues = Object.values(modules);
      const overallProgress = Math.round(
        moduleValues.reduce((sum, val) => sum + val, 0) / moduleValues.length
      );

      // Determine badge
      let badge: 'GOLD' | 'SILVER' | 'BRONZE' | 'NONE' = 'NONE';
      if (overallProgress === 100) badge = 'GOLD';
      else if (overallProgress >= 50) badge = 'SILVER';
      else if (overallProgress > 0) badge = 'BRONZE';

      return {
        id: user.id,
        name: user.name || 'Unknown',
        email: user.email,
        department: 'Engineering', // TODO: Get from user profile
        overallProgress,
        modules,
        badge,
        lastActive: user.lastActiveAt?.toISOString() || new Date().toISOString()
      };
    });

    // Apply filters
    let filteredEmployees = employees;

    if (search && search !== '') {
      const searchLower = String(search).toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.email.toLowerCase().includes(searchLower)
      );
    }

    if (status && status !== 'all') {
      if (status === 'completed') {
        filteredEmployees = filteredEmployees.filter(emp => emp.overallProgress === 100);
      } else if (status === 'in-progress') {
        filteredEmployees = filteredEmployees.filter(emp => emp.overallProgress > 0 && emp.overallProgress < 100);
      } else if (status === 'not-started') {
        filteredEmployees = filteredEmployees.filter(emp => emp.overallProgress === 0);
      }
    }

    res.json({
      success: true,
      employees: filteredEmployees,
      count: filteredEmployees.length
    });
  } catch (error) {
    console.error('Admin progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch employee progress'
    });
  }
});

/**
 * POST /api/admin/send-reminders
 * Send reminder emails to employees who haven't completed training
 */
router.post('/send-reminders', async (req: Request, res: Response) => {
  try {
    // Get all users with incomplete training
    const users = await prisma.user.findMany({
      where: {
        role: { in: ['EMPLOYEE', 'TRAINEE'] }
      },
      include: {
        trainingProgress: true
      }
    });

    let reminderCount = 0;

    for (const user of users) {
      const progress = user.trainingProgress;
      
      // Calculate overall completion
      const modules = ['phishing-detective', 'password-guardian', 'malware-defender', 'social-engineer-spotter'];
      const completions = modules.map(m => calculateModuleCompletion(progress, m));
      const overallProgress = Math.round(
        completions.reduce((sum, val) => sum + val, 0) / completions.length
      );

      // Send reminder if not completed
      if (overallProgress < 100) {
        // TODO: Implement actual email sending
        // await sendReminderEmail(user);
        reminderCount++;
      }
    }

    res.json({
      success: true,
      count: reminderCount,
      message: `Reminders sent to ${reminderCount} employees`
    });
  } catch (error) {
    console.error('Reminder send error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send reminders'
    });
  }
});

/**
 * GET /api/admin/reports
 * Generate company training report
 */
router.get('/reports', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: { in: ['EMPLOYEE', 'TRAINEE'] }
      },
      include: {
        trainingProgress: true
      }
    });

    const totalEmployees = users.length;
    let goldBadges = 0;
    let silverBadges = 0;
    let bronzeBadges = 0;
    let notStarted = 0;
    let totalScore = 0;

    users.forEach(user => {
      const progress = user.trainingProgress;
      const modules = ['phishing-detective', 'password-guardian', 'malware-defender', 'social-engineer-spotter'];
      const completions = modules.map(m => calculateModuleCompletion(progress, m));
      const overallProgress = Math.round(
        completions.reduce((sum, val) => sum + val, 0) / completions.length
      );

      if (overallProgress === 100) goldBadges++;
      else if (overallProgress >= 50) silverBadges++;
      else if (overallProgress > 0) bronzeBadges++;
      else notStarted++;

      totalScore += progress.reduce((sum: number, p: any) => sum + p.score, 0);
    });

    const averageScore = users.length > 0 ? totalScore / users.length : 0;

    res.json({
      success: true,
      report: {
        totalEmployees,
        completedCount: goldBadges,
        inProgressCount: silverBadges + bronzeBadges,
        notStartedCount: notStarted,
        averageScore: Math.round(averageScore),
        goldBadges,
        silverBadges,
        bronzeBadges,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate report'
    });
  }
});

/**
 * Helper function to calculate module completion percentage
 */
function calculateModuleCompletion(progress: any[], moduleId: string): number {
  const moduleProgress = progress.filter((p: any) => p.moduleId === moduleId);
  
  if (moduleProgress.length === 0) return 0;
  
  const completedSteps = moduleProgress.filter((p: any) => p.completed).length;
  const totalSteps = moduleProgress.length;
  
  return Math.round((completedSteps / totalSteps) * 100);
}

export default router;
