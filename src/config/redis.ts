import Redis from "ioredis";

import { logger } from "@/utils/logger";

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

/**
 * Shared Redis client for caching, queues, and distributed coordination.
 */
export const redis = new Redis(redisUrl, {
  lazyConnect: true,
  maxRetriesPerRequest: 2,
  retryStrategy: (times: number) => {
    if (times > 5) {
      logger.warn("Redis retry limit reached. Stopping reconnect attempts.");
      return null;
    }

    return Math.min(times * 200, 2000);
  }
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (error: Error) => {
  logger.error("Redis error", {
    error: error.message || "Unknown Redis error",
    stack: error.stack
  });
});

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
    logger.info("Redis connection established");
  } catch (error) {
    logger.warn("Redis unavailable. Continuing without Redis-dependent features.", {
      error: error instanceof Error ? error.message : "Unknown Redis connection error"
    });
  }
}
