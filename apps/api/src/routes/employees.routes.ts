import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { authenticate as authMiddleware } from '../middleware/auth';
import multer from 'multer';
import { parse } from 'csv-parse/sync';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/employees/upload - Upload employees via CSV
router.post('/upload', authMiddleware, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { organizationId } = req.body;

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: 'Organization ID is required'
      });
    }

    // Parse CSV
    const fileContent = req.file.buffer.toString('utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    // Validate and prepare employee data
    const employees = records.map((row: any) => ({
      email: row.email || row.Email,
      firstName: row.firstName || row['First Name'] || row.firstname,
      lastName: row.lastName || row['Last Name'] || row.lastname,
      department: row.department || row.Department || null,
      position: row.position || row.Position || null,
      organizationId
    }));

    // Validate required fields
    const invalidRecords = employees.filter(emp => !emp.email || !emp.firstName || !emp.lastName);
    if (invalidRecords.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Some records are missing required fields (email, firstName, lastName)',
        invalidCount: invalidRecords.length
      });
    }

    // Bulk insert employees (skip duplicates)
    const result = await prisma.employee.createMany({
      data: employees,
      skipDuplicates: true
    });

    // Update organization employee count
    await prisma.organization.update({
      where: { id: organizationId },
      data: {
        employeeCount: {
          increment: result.count
        }
      }
    });

    res.json({
      success: true,
      message: `Successfully uploaded ${result.count} employees`,
      count: result.count,
      total: employees.length,
      skipped: employees.length - result.count
    });
  } catch (error) {
    console.error('Employee upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload employees',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/employees - Get all employees for an organization
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { organizationId } = req.query;

    if (!organizationId) {
      return res.status(400).json({
        success: false,
        message: 'Organization ID is required'
      });
    }

    const employees = await prisma.employee.findMany({
      where: {
        organizationId: organizationId as string,
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        campaignTargets: {
          include: {
            campaign: true
          }
        }
      }
    });

    res.json({
      success: true,
      employees,
      count: employees.length
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employees'
    });
  }
});

// GET /api/employees/:id - Get a single employee
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        organization: true,
        campaignTargets: {
          include: {
            campaign: true
          }
        }
      }
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employee'
    });
  }
});

// PATCH /api/employees/:id - Update employee
router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, department, position, isActive } = req.body;

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        firstName,
        lastName,
        department,
        position,
        isActive
      }
    });

    res.json({
      success: true,
      employee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update employee'
    });
  }
});

// DELETE /api/employees/:id - Delete employee (soft delete)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    res.json({
      success: true,
      message: 'Employee deactivated successfully',
      employee
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete employee'
    });
  }
});

export default router;
