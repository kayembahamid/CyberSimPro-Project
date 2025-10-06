import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import { randomBytes } from 'crypto';

export class CertificationService {
  async getAll() {
    try {
      const certifications = await prisma.certification.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      
      return certifications;
    } catch (error) {
      logger.error('Error in getAll certifications:', error);
      throw error;
    }
  }

  async getUserCertifications(userId: string) {
    try {
      const certifications = await prisma.certification.findMany({
        where: { userId },
        orderBy: {
          issueDate: 'desc',
        },
      });
      
      return certifications;
    } catch (error) {
      logger.error('Error in getUserCertifications:', error);
      throw error;
    }
  }

  async issueCertification(data: {
    userId: string;
    name: string;
  }) {
    try {
      // Set expiry date (1 year from now)
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      
      const certification = await prisma.certification.create({
        data: {
          userId: data.userId,
          name: data.name,
          issueDate: new Date(),
          expiryDate,
          status: 'ACTIVE',
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      
      logger.info(`Certification issued: ${certification.id} for user: ${data.userId}`);
      return certification;
    } catch (error) {
      logger.error('Error in issueCertification:', error);
      throw error;
    }
  }

  async verifyCertification(certificationId: string) {
    try {
      const certification = await prisma.certification.findUnique({
        where: { id: certificationId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      
      if (!certification) {
        return null;
      }
      
      // Check if expired
      const isExpired = certification.expiryDate ? new Date() > certification.expiryDate : false;
      
      return {
        ...certification,
        isExpired,
        isValid: !isExpired && certification.status === 'ACTIVE',
      };
    } catch (error) {
      logger.error('Error in verifyCertification:', error);
      throw error;
    }
  }

  async revokeCertification(id: string) {
    try {
      await prisma.certification.update({
        where: { id },
        data: { status: 'REVOKED' },
      });
      
      logger.info(`Certification revoked: ${id}`);
    } catch (error) {
      logger.error('Error in revokeCertification:', error);
      throw error;
    }
  }
}
