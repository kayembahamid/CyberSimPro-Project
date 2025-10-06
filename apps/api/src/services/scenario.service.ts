import { prisma } from '../config/database';
import { logger } from '../utils/logger';

export class ScenarioService {
  async getAll(filters?: {
    difficulty?: string;
  }) {
    try {
      const where: any = {};
      
      if (filters?.difficulty) {
        where.difficulty = filters.difficulty;
      }
      
      const scenarios = await prisma.scenario.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      return scenarios;
    } catch (error) {
      logger.error('Error in getAll scenarios:', error);
      throw error;
    }
  }

  async getById(id: string) {
    try {
      const scenario = await prisma.scenario.findUnique({
        where: { id },
        include: {
          simulations: {
            take: 5,
            orderBy: {
              createdAt: 'desc',
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
          },
        },
      });
      
      return scenario;
    } catch (error) {
      logger.error('Error in getById scenario:', error);
      throw error;
    }
  }

  async create(data: {
    userId: string;
    title: string;
    description: string;
    difficulty: string;
  }) {
    try {
      const scenario = await prisma.scenario.create({
        data: {
          userId: data.userId,
          title: data.title,
          description: data.description,
          difficulty: data.difficulty,
          completed: false,
        },
      });
      
      logger.info(`Scenario created: ${scenario.id}`);
      return scenario;
    } catch (error) {
      logger.error('Error in create scenario:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    difficulty: string;
    completed: boolean;
    score: number;
  }>) {
    try {
      const scenario = await prisma.scenario.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.difficulty && { difficulty: data.difficulty }),
          ...(data.completed !== undefined && { completed: data.completed }),
          ...(data.score !== undefined && { score: data.score }),
        },
      });
      
      logger.info(`Scenario updated: ${id}`);
      return scenario;
    } catch (error) {
      logger.error('Error in update scenario:', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      // Check if scenario has simulations
      const simulationCount = await prisma.simulation.count({
        where: { scenarioId: id },
      });
      
      if (simulationCount > 0) {
        throw new Error('Cannot delete scenario with existing simulations');
      }
      
      await prisma.scenario.delete({
        where: { id },
      });
      
      logger.info(`Scenario deleted: ${id}`);
    } catch (error) {
      logger.error('Error in delete scenario:', error);
      throw error;
    }
  }

}
