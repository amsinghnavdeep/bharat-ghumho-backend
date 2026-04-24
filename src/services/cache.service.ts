/**
 * Redis cache helpers — wraps get/set/del with JSON serialization
 */
import { redis } from '../config/redis';
import { logger } from '../utils/logger';
import { CACHE_TTL } from '../utils/constants';

export class CacheService {
  /**
   * Get cached value by key
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Cache GET error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set cached value with TTL (in seconds)
   */
  static async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await redis.setex(key, ttl, serialized);
      } else {
        await redis.set(key, serialized);
      }
    } catch (error) {
      logger.error(`Cache SET error for key ${key}:`, error);
    }
  }

  /**
   * Delete cached value
   */
  static async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error(`Cache DEL error for key ${key}:`, error);
    }
  }

  /**
   * Delete all keys matching a pattern
   */
  static async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.error(`Cache DEL pattern error for ${pattern}:`, error);
    }
  }

  /**
   * Get or set — fetch from cache, or run callback and cache result
   */
  static async getOrSet<T>(key: string, callback: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = await CacheService.get<T>(key);
    if (cached) {
      logger.debug(`Cache HIT: ${key}`);
      return cached;
    }

    logger.debug(`Cache MISS: ${key}`);
    const result = await callback();
    await CacheService.set(key, result, ttl);
    return result;
  }
}
