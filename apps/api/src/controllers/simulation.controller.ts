import { Request, Response } from 'express';
import { SimulationService } from '../services/simulation.service';
import { logger } from '../utils/logger';

const simulationService = new SimulationService();

export class SimulationController {
  async getAll(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const simulations = await simulationService.getAll(userId);
      
      res.json({
        success: true,
        data: simulations,
        pagination: {
          total: simulations.length,
          limit: 20,
          offset: 0,
          hasMore: false,
        },
      });
    } catch (error) {
      logger.error('Error fetching simulations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch simulations',
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const simulation = await simulationService.getById(id);
      
      if (!simulation) {
        return res.status(404).json({
          success: false,
          error: 'Simulation not found',
        });
      }
      
      res.json({
        success: true,
        data: simulation,
      });
    } catch (error) {
      logger.error('Error fetching simulation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch simulation',
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const simulation = await simulationService.create(data);
      
      res.status(201).json({
        success: true,
        data: simulation,
        message: 'Simulation created successfully',
      });
    } catch (error) {
      logger.error('Error creating simulation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create simulation',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const simulation = await simulationService.update(id, data);
      
      if (!simulation) {
        return res.status(404).json({
          success: false,
          error: 'Simulation not found',
        });
      }
      
      res.json({
        success: true,
        data: simulation,
        message: 'Simulation updated successfully',
      });
    } catch (error) {
      logger.error('Error updating simulation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update simulation',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await simulationService.delete(id);
      
      res.json({
        success: true,
        message: 'Simulation deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting simulation:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete simulation',
      });
    }
  }

  async getTelemetry(req: Request, res: Response) {
    try {
      // Telemetry not implemented yet
      res.json({
        success: true,
        data: [],
        message: 'Telemetry feature coming soon',
      });
    } catch (error) {
      logger.error('Error fetching simulation telemetry:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch simulation telemetry',
      });
    }
  }
}
