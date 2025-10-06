import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

// Import routes
import healthRouter from './routes/health.routes';
import authRouter from './routes/auth.routes';
import simulationsRouter from './routes/simulations.routes';
import scenariosRouter from './routes/scenarios.routes';
import teamsRouter from './routes/teams.routes';
import recommendationsRouter from './routes/recommendations.routes';
import complianceRouter from './routes/compliance.routes';
import certificationsRouter from './routes/certifications.routes';
import trainingRouter from './routes/training.routes';
import mcpRouter from './routes/mcp.routes';
import demoRouter from './routes/demo.routes';
import billingRouter from './routes/billing.routes';
import employeesRouter from './routes/employees.routes';
import adminRouter from './routes/admin.routes';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3004',
    process.env.NEXT_PUBLIC_APP_URL || ''
  ].filter(Boolean),
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Routes
app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/simulations', simulationsRouter);
app.use('/api/scenarios', scenariosRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/compliance', complianceRouter);
app.use('/api/certifications', certificationsRouter);
app.use('/api/training', trainingRouter);
app.use('/api/mcp', mcpRouter);
app.use('/api/demos', demoRouter);
app.use('/api/billing', billingRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/admin', adminRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);
