import { PrismaClient } from "@prisma/client";
import { logger } from "@/utils/logger";

/**
 * Singleton Prisma client for database operations.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient | null };

export let prisma: PrismaClient | null = globalForPrisma.prisma ?? null;

export async function connectDatabase(): Promise<void> {
  if (prisma) {
    return;
  }

  if (!process.env.DATABASE_URL) {
    logger.warn("DATABASE_URL is missing. Database connection skipped.");
    return;
  }

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"]
    });

    await client.$connect();
    prisma = client;

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prisma;
    }

    logger.info("PostgreSQL connected via Prisma");
  } catch (error) {
    prisma = null;
    logger.error("Prisma connection failed. Continuing without database connection.", {
      error: error instanceof Error ? error.message : "Unknown Prisma connection error"
    });
  }
}
