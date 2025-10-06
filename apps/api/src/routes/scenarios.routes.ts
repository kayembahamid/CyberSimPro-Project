import { Router } from 'express';
import { ScenarioController } from '../controllers/scenario.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new ScenarioController();

// Get all scenarios (with optional type/difficulty filters)
router.get('/', (req, res) => controller.getAll(req, res));

// Create new scenario
router.post('/', (req, res) => controller.create(req, res));

// Get scenario by ID
router.get('/:id', (req, res) => controller.getById(req, res));

// Update scenario
router.put('/:id', (req, res) => controller.update(req, res));

// Delete scenario
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;
