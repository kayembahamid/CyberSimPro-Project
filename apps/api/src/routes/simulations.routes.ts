import { Router } from 'express';
import { SimulationController } from '../controllers/simulation.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new SimulationController();

// Get all simulations (with optional userId filter)
router.get('/', (req, res) => controller.getAll(req, res));

// Create new simulation
router.post('/', (req, res) => controller.create(req, res));

// Get simulation by ID
router.get('/:id', (req, res) => controller.getById(req, res));

// Update simulation
router.put('/:id', (req, res) => controller.update(req, res));

// Delete simulation
router.delete('/:id', (req, res) => controller.delete(req, res));

// Get simulation telemetry
router.get('/:id/telemetry', (req, res) => controller.getTelemetry(req, res));

export default router;
