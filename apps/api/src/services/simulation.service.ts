import { prisma } from '../config/database';
import { logger } from '../utils/logger';

export class SimulationService {
  async getAll(userId?: string) {
    try {
      const where = userId ? { userId } : {};
      
      const simulations = await prisma.simulation.findMany({
        where,
        include: {
          scenario: {
            select: {
              id: true,
              title: true,
              difficulty: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      return simulations;
    } catch (error) {
      logger.error('Error in getAll simulations:', error);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const simulation = await prisma.simulation.findUnique({
        where: { id },
        include: {
          scenario: true,
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      
      return simulation;
    } catch (error) {
      logger.error('Error in getById simulation:', error);
      throw error;
    }
  }

  async create(data: {
    userId: string;
    scenarioId: string;
    organizationId?: string;
  }) {
    try {
      const simulation = await prisma.simulation.create({
        data: {
          userId: data.userId,
          scenarioId: data.scenarioId,
          type: 'TRAINING',
          status: 'PENDING',
        },
        include: {
          scenario: true,
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      
      logger.info(`Simulation created: ${simulation.id}`);
      return simulation;
    } catch (error) {
      logger.error('Error in create simulation:', error);
      throw error;
    }
  }

  async update(id: string, data: {
    status?: string;
    progress?: number;
    score?: number;
    result?: any;
  }) {
    try {
      const simulation = await prisma.simulation.update({
        where: { id },
        data: {
          ...(data.status && { status: data.status }),
          ...(data.score !== undefined && { score: data.score }),
          ...(data.status === 'COMPLETED' && { completedAt: new Date() }),
        },
        include: {
          scenario: true,
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
            },
          },
        },
      });
      
      logger.info(`Simulation updated: ${id}`);
      return simulation;
    } catch (error) {
      logger.error('Error in update simulation:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.simulation.delete({
        where: { id },
      });
      
      logger.info(`Simulation deleted: ${id}`);
    } catch (error) {
      logger.error('Error in delete simulation:', error);
      throw error;
    }
  }
}
