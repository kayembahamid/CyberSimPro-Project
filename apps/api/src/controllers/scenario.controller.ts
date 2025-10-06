import { Request, Response } from 'express';
import { ScenarioService } from '../services/scenario.service';
import { logger } from '../utils/logger';

const scenarioService = new ScenarioService();

export class ScenarioController {
  async getAll(req: Request, res: Response) {
    try {
      const { type, difficulty } = req.query;
      const scenarios = await scenarioService.getAll({
    
        difficulty: difficulty as string,
      });
      
      res.json({
        success: true,
        data: scenarios,
        pagination: {
          total: scenarios.length,
          limit: 20,
          offset: 0,
          hasMore: false,
        },
      });
    } catch (error) {
      logger.error('Error fetching scenarios:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch scenarios',
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const scenario = await scenarioService.getById(id);
      
      if (!scenario) {
        return res.status(404).json({
          success: false,
          error: 'Scenario not found',
        });
      }
      
      res.json({
        success: true,
        data: scenario,
      });
    } catch (error) {
      logger.error('Error fetching scenario:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch scenario',
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const scenario = await scenarioService.create(data);
      
      res.status(201).json({
        success: true,
        data: scenario,
        message: 'Scenario created successfully',
      });
    } catch (error) {
      logger.error('Error creating scenario:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create scenario',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const scenario = await scenarioService.update(id, data);
      
      if (!scenario) {
        return res.status(404).json({
          success: false,
          error: 'Scenario not found',
        });
      }
      
      res.json({
        success: true,
        data: scenario,
        message: 'Scenario updated successfully',
      });
    } catch (error) {
      logger.error('Error updating scenario:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update scenario',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await scenarioService.delete(id);
      
      res.json({
        success: true,
        message: 'Scenario deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting scenario:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete scenario',
      });
    }
  }
}
