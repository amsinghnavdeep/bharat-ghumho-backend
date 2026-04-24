/**
 * Cron job: Check flight prices for active price alerts every 6 hours
 */
import cron from 'node-cron';
import { prisma } from '../config/database';
import { AmadeusService } from '../services/amadeus.service';
import { NotificationService } from '../services/notification.service';
import { logger } from '../utils/logger';
import { PRICE_ALERT_CHECK_INTERVAL } from '../utils/constants';

export function startPriceAlertJob() {
  cron.schedule(PRICE_ALERT_CHECK_INTERVAL, async () => {
    logger.info('🔔 Price alert check started');

    try {
      const alerts = await prisma.priceAlert.findMany({
        where: {
          isActive: true,
          expiresAt: { gt: new Date() },
          departureDate: { gt: new Date() },
        },
        include: { user: true },
      });

      logger.info(`Checking ${alerts.length} active price alerts`);

      for (const alert of alerts) {
        try {
          const results = await AmadeusService.searchFlights({
            origin: alert.origin,
            destination: alert.destination,
            departureDate: alert.departureDate.toISOString().split('T')[0],
            returnDate: alert.returnDate?.toISOString().split('T')[0],
            adults: 1,
            cabinClass: alert.cabinClass,
            currency: alert.currency,
          });

          if (results.flights.length === 0) continue;

          // Find cheapest flight
          const cheapest = results.flights.reduce((min: any, f: any) =>
            parseFloat(f.price.grandTotal) < parseFloat(min.price.grandTotal) ? f : min
          );
          const currentPrice = parseFloat(cheapest.price.grandTotal);

          // Update current price
          await prisma.priceAlert.update({
            where: { id: alert.id },
            data: { currentPrice, lastCheckedAt: new Date() },
          });

          // Check if price dropped below target
          if (currentPrice <= Number(alert.targetPrice)) {
            logger.info(`🎉 Price alert triggered! ${alert.origin}→${alert.destination}: ${currentPrice} <= ${alert.targetPrice}`);

            if (alert.alertMethod === 'EMAIL' || alert.alertMethod === 'BOTH') {
              await NotificationService.sendPriceAlert(alert.user.email, alert.user.firstName, alert, currentPrice);
            }

            if (alert.alertMethod === 'WHATSAPP' || alert.alertMethod === 'BOTH') {
              if (alert.user.phone) {
                await NotificationService.sendWhatsApp(
                  alert.user.phone,
                  `🔔 Price Drop! ${alert.origin}→${alert.destination} now ${alert.currency} ${currentPrice} (your target: ${alert.targetPrice}). Book at bharatghumho.com`
                );
              }
            }

            // Deactivate after notification
            await prisma.priceAlert.update({
              where: { id: alert.id },
              data: { isActive: false },
            });
          }
        } catch (err) {
          logger.error(`Price alert check failed for ${alert.id}:`, err);
        }
      }

      logger.info('🔔 Price alert check completed');
    } catch (error) {
      logger.error('Price alert job error:', error);
    }
  });

  logger.info('📋 Price alert cron job scheduled (every 6 hours)');
}
