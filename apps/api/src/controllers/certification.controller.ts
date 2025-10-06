import { Request, Response } from 'express';
import { CertificationService } from '../services/certification.service';
import { logger } from '../utils/logger';

const certificationService = new CertificationService();

export class CertificationController {
  async getAll(req: Request, res: Response) {
    try {
      const certifications = await certificationService.getAll();
      
      res.json({
        success: true,
        data: certifications,
      });
    } catch (error) {
      logger.error('Error fetching certifications:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch certifications',
      });
    }
  }

  async getUserCertifications(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const certifications = await certificationService.getUserCertifications(userId);
      
      res.json({
        success: true,
        data: certifications,
      });
    } catch (error) {
      logger.error('Error fetching user certifications:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user certifications',
      });
    }
  }

  async issueCertification(req: Request, res: Response) {
    try {
      const data = req.body;
      const userCertification = await certificationService.issueCertification(data);
      
      res.status(201).json({
        success: true,
        data: userCertification,
        message: 'Certification issued successfully',
      });
    } catch (error) {
      logger.error('Error issuing certification:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to issue certification',
      });
    }
  }

  async verifyCertification(req: Request, res: Response) {
    try {
      const { code } = req.params;
      const certification = await certificationService.verifyCertification(code);
      
      if (!certification) {
        return res.status(404).json({
          success: false,
          error: 'Certification not found',
        });
      }
      
      res.json({
        success: true,
        data: certification,
        verified: true,
      });
    } catch (error) {
      logger.error('Error verifying certification:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to verify certification',
      });
    }
  }
}
