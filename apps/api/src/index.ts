import dotenv from 'dotenv';
import { app } from './app';
import { logger } from './utils/logger';
import { prisma } from './config/database';

dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3002;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected');

    // Start HTTP server
    const server = app.listen(PORT, () => {
      logger.info(`🚀 API server running on port ${PORT}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received, shutting down gracefully');
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT received, shutting down gracefully');
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
