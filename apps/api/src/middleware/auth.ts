import { Request, Response, NextFunction } from 'express';

// Simple auth middleware - skip authentication for now
export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    // For development: Skip authentication
    // In production: Implement proper JWT verification
    
    // Mock user for testing
    (req as any).user = {
      id: 'demo-user',
      email: 'demo@example.com'
    };
    
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: 'Authentication error' });
  }
}
