import "dotenv/config";

import compression from "compression";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as Sentry from "@sentry/node";

import { connectDatabase, prisma } from "@/config/database";
import { connectRedis, redis } from "@/config/redis";
import { errorMiddleware } from "@/middleware/error.middleware";
import {
  adminRouter,
  authRouter,
  bookingsRouter,
  flightsRouter,
  healthRouter,
  hotelsRouter,
  paymentsRouter,
  priceAlertsRouter,
  reviewsRouter,
  searchHistoryRouter,
  uploadRouter,
  usersRouter
} from "@/routes";
import { logger, morganStream } from "@/utils/logger";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV ?? "development",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1
});

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    stream: morganStream
  })
);

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bharat Ghumho API",
      version: "1.0.0"
    },
    servers: [{ url: process.env.API_URL ?? `http://localhost:${port}` }]
  },
  apis: []
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "development"
  });
});

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/flights", flightsRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/price-alerts", priceAlertsRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/search-history", searchHistoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api/upload", uploadRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

Sentry.setupExpressErrorHandler(app);
app.use(errorMiddleware);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next();
});

let server: ReturnType<typeof app.listen>;

async function shutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}, initiating graceful shutdown`);

  if (!server) {
    process.exit(0);
    return;
  }

  server.close(async (serverError?: Error) => {
    if (serverError) {
      logger.error("Failed to close HTTP server cleanly", { error: serverError.message });
    }

    try {
      if (prisma) {
        await prisma.$disconnect();
      }
      await redis.quit();
      logger.info("Graceful shutdown completed");
      process.exit(0);
    } catch (shutdownError) {
      logger.error("Graceful shutdown failed", {
        error: shutdownError instanceof Error ? shutdownError.message : "Unknown shutdown error"
      });
      process.exit(1);
    }
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});

async function startServer(): Promise<void> {
  await connectDatabase();
  await connectRedis();

  server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

void startServer();

export default app;
