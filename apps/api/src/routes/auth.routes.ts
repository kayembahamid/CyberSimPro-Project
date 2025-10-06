import { Router } from 'express';

const router = Router();

// Placeholder routes - to be implemented with Supabase integration
router.post('/signup', async (req, res) => {
  res.status(501).json({ message: 'Auth endpoints to be implemented' });
});

router.post('/login', async (req, res) => {
  res.status(501).json({ message: 'Auth endpoints to be implemented' });
});

router.get('/me', async (req, res) => {
  res.status(501).json({ message: 'Auth endpoints to be implemented' });
});

export default router;
