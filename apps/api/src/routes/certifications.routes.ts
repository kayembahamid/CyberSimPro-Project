import { Router } from 'express';
import { CertificationController } from '../controllers/certification.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const controller = new CertificationController();

// Get all certifications
router.get('/', (req, res) => controller.getAll(req, res));

// Get user certifications
router.get('/user/:userId', (req, res) => controller.getUserCertifications(req, res));

// Issue certification
router.post('/issue', (req, res) => controller.issueCertification(req, res));

// Verify certification by code (public endpoint for external verification)
router.get('/verify/:code', (req, res) => controller.verifyCertification(req, res));

export default router;
