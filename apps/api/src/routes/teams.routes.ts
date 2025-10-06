import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => res.status(501).json({ message: 'Teams API - to be implemented' }));
router.post('/', async (req, res) => res.status(501).json({ message: 'Create team - to be implemented' }));
router.get('/:id/leaderboard', async (req, res) => res.status(501).json({ message: 'Leaderboard - to be implemented' }));

export default router;
