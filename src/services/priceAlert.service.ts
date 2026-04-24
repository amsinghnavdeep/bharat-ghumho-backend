/**
 * Price alert monitoring logic
 */
import { prisma } from '../config/database';
import { AmadeusService } from './amadeus.service';
import { NotificationService } from './notification.service';
import { logger } from '../utils/logger';
import dayjs from 'dayjs';

export class PriceAlertService {
  /**
   * Create a new price alert
   */
  static async create(userId: string, data: any) {
    // Count existing alerts
    const count = await prisma.priceAlert.count({
      where: { userId, isActive: true },
    });

    if (count >= 20) {
      throw new Error('Maximum 20 active price alerts allowed');
    }

    const alert = await prisma.priceAlert.create({
      data: {
        userId,
        origin: data.origin,
        destination: data.destination,
        departureDate: new Date(data.departureDate),
        returnDate: data.returnDate ? new Date(data.returnDate) : null,
        cabinClass: data.cabinClass || 'ECONOMY',
        targetPrice: data.targetPrice,
        currency: data.currency || 'INR',
        alertMethod: data.alertMethod || 'EMAIL',
        expiresAt: dayjs().add(30, 'day').toDate(),
      },
    });

    logger.info(`Price alert created: ${alert.id} — ${data.origin} → ${data.destination}`);
    return alert;
  }

  /**
   * Check all active alerts and send notifications when price drops
   */
  static async checkAlerts() {
    const alerts = await prisma.priceAlert.findMany({
      where: {
        isActive: true,
        expiresAt: { gt: new Date() },
        departureDate: { gt: new Date() },
      },
      include: { user: true },
    });

    logger.info(`Checking ${alerts.length} active price alerts...`);

    for (const alert of alerts) {
      try {
        const result = await AmadeusService.searchFlights({
          origin: alert.origin,
          destination: alert.destination,
          departureDate: dayjs(alert.departureDate).format('YYYY-MM-DD'),
          returnDate: alert.returnDate ? dayjs(alert.returnDate).format('YYYY-MM-DD') : undefined,
          adults: 1,
          cabinClass: alert.cabinClass,
          currency: alert.currency,
        });

        if (result.flights.length === 0) continue;

        // Find cheapest price
        const cheapest = Math.min(
          ...result.flights.map((f: any) => parseFloat(f.price.grandTotal))
        );

        // Update current price
        await prisma.priceAlert.update({
          where: { id: alert.id },
          data: { currentPrice: cheapest, lastCheckedAt: new Date() },
        });

        // Send notification if below target
        if (cheapest <= Number(alert.targetPrice)) {
          logger.info(`Price alert triggered: ${alert.origin} → ${alert.destination} at ${cheapest}`);

          if (alert.alertMethod === 'EMAIL' || alert.alertMethod === 'BOTH') {
            await NotificationService.sendPriceAlert(
              alert.user.email,
              alert.user.firstName,
              alert,
              cheapest
            );
          }

          if (alert.alertMethod === 'WHATSAPP' || alert.alertMethod === 'BOTH') {
            if (alert.user.phone) {
              await NotificationService.sendWhatsApp(
                alert.user.phone,
                `🔔 Price Alert! ${alert.origin} → ${alert.destination} is now ${alert.currency} ${cheapest} (your target: ${alert.currency} ${alert.targetPrice}). Book now on Bharat Ghumho!`
              );
            }
          }

          // Deactivate after triggering
          await prisma.priceAlert.update({
            where: { id: alert.id },
            data: { isActive: false },
          });
        }
      } catch (error) {
        logger.error(`Price alert check failed for ${alert.id}:`, error);
      }
    }

    logger.info('Price alert check completed');
  }

  /**
   * Deactivate expired alerts
   */
  static async deactivateExpired() {
    const result = await prisma.priceAlert.updateMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: { lte: new Date() } },
          { departureDate: { lte: new Date() } },
        ],
      },
      data: { isActive: false },
    });

    if (result.count > 0) {
      logger.info(`Deactivated ${result.count} expired price alerts`);
    }
  }
}
