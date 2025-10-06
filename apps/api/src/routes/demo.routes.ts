import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';

const router = Router();

// POST /api/demos - Create a demo request
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, company, phone, employeeCount } = req.body;

    // Validate required fields
    if (!name || !email || !company || !employeeCount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, company, employeeCount'
      });
    }

    // Create demo request
    const demo = await prisma.demoRequest.create({
      data: {
        name,
        email,
        company,
        phone: phone || null,
        employeeCount,
        status: 'pending'
      }
    });

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user
    // For now, we'll just log it
    console.log(`New demo request from ${email} for company ${company}`);

    res.status(201).json({
      success: true,
      message: 'Demo request received successfully',
      demoId: demo.id
    });
  } catch (error) {
    console.error('Demo booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book demo. Please try again.'
    });
  }
});

// GET /api/demos - Get all demo requests (admin only)
router.get('/', async (req: Request, res: Response) => {
  try {
    const demos = await prisma.demoRequest.findMany({
      orderBy: {
        requestedAt: 'desc'
      }
    });

    res.json({
      success: true,
      demos
    });
  } catch (error) {
    console.error('Error fetching demos:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch demo requests'
    });
  }
});

// PATCH /api/demos/:id - Update demo request status
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, scheduledAt } = req.body;

    const demo = await prisma.demoRequest.update({
      where: { id },
      data: {
        status,
        notes: notes || undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined
      }
    });

    res.json({
      success: true,
      demo
    });
  } catch (error) {
    console.error('Error updating demo:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update demo request'
    });
  }
});

export default router;
