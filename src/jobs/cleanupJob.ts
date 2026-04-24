/**
 * Cron job: Purge expired data (daily at 2 AM)
 */
import cron from 'node-cron';
import dayjs from 'dayjs';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import { CLEANUP_INTERVAL } from '../utils/constants';

export function startCleanupJob() {
  cron.schedule(CLEANUP_INTERVAL, async () => {
    logger.info('🧹 Cleanup job started');

    try {
      // 1. Delete expired sessions
      const expiredSessions = await prisma.session.deleteMany({
        where: { expiresAt: { lt: new Date() } },
      });
      logger.info(`Deleted ${expiredSessions.count} expired sessions`);

      // 2. Deactivate expired price alerts
      const expiredAlerts = await prisma.priceAlert.updateMany({
        where: {
          isActive: true,
          OR: [
            { expiresAt: { lt: new Date() } },
            { departureDate: { lt: new Date() } },
          ],
        },
        data: { isActive: false },
      });
      logger.info(`Deactivated ${expiredAlerts.count} expired price alerts`);

      // 3. Delete old search history (older than 90 days)
      const oldSearches = await prisma.searchHistory.deleteMany({
        where: { createdAt: { lt: dayjs().subtract(90, 'day').toDate() } },
      });
      logger.info(`Deleted ${oldSearches.count} old search history entries`);

      // 4. Cancel stale pending bookings (pending for more than 30 minutes)
      const staleBookings = await prisma.booking.updateMany({
        where: {
          status: 'PENDING',
          createdAt: { lt: dayjs().subtract(30, 'minute').toDate() },
        },
        data: { status: 'CANCELLED' },
      });
      logger.info(`Cancelled ${staleBookings.count} stale pending bookings`);

      logger.info('🧹 Cleanup job completed');
    } catch (error) {
      logger.error('Cleanup job error:', error);
    }
  });

  logger.info('📋 Cleanup cron job scheduled (daily at 2 AM)');
}
