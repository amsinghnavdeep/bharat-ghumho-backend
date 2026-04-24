/**
 * Bharat Ghumho API — Main Express Application
 */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';

import { validateEnv } from './config/env';
import { prisma } from './config/database';
import { redis } from './config/redis';
import { logger, morganStream } from './utils/logger';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter } from './middleware/rateLimiter.middleware';
import routes from './routes';

// Cron jobs
import { startPriceAlertJob } from './jobs/priceAlertJob';
import { startBookingReminderJob } from './jobs/bookingReminderJob';
import { startCleanupJob } from './jobs/cleanupJob';

// Validate required environment variables
validateEnv();

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

// ========== SENTRY ==========
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  logger.info('Sentry initialized');
}

// ========== MIDDLEWARE ==========
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: morganStream }));
app.use('/api/', apiLimiter);

// ========== HEALTH CHECK ==========
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'Bharat Ghumho API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ========== SWAGGER ==========
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bharat Ghumho API',
      version: '1.0.0',
      description: 'India-centric global flight and hotel booking platform API',
    },
    servers: [{ url: process.env.API_URL || 'http://localhost:4000' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ========== API ROUTES ==========
app.use('/api', routes);

// ========== 404 HANDLER ==========
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ========== SENTRY ERROR HANDLER ==========
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// ========== ERROR HANDLER ==========
app.use(errorHandler);

// ========== START SERVER ==========
async function startServer() {
  try {
    // Connect to database
    await prisma.$connect();
    logger.info('✅ Database connected');

    // Connect to Redis
    await redis.connect();
    logger.info('✅ Redis connected');

    // Start cron jobs
    if (process.env.NODE_ENV !== 'test') {
      startPriceAlertJob();
      startBookingReminderJob();
      startCleanupJob();
    }

    const server = app.listen(PORT, () => {
      logger.info(`\n🚀 Bharat Ghumho API running on port ${PORT}`);
      logger.info(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
      logger.info(`❤️  Health check: http://localhost:${PORT}/api/health\n`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info(`\n${signal} received — shutting down gracefully...`);

      server.close(async () => {
        await prisma.$disconnect();
        logger.info('Database disconnected');

        redis.quit();
        logger.info('Redis disconnected');

        logger.info('Server closed. Goodbye! 👋');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
