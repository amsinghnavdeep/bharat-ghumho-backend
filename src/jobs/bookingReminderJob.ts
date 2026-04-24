/**
 * Cron job: Send travel reminders for upcoming bookings (daily at 9 AM)
 */
import cron from 'node-cron';
import dayjs from 'dayjs';
import { prisma } from '../config/database';
import { NotificationService } from '../services/notification.service';
import { logger } from '../utils/logger';
import { BOOKING_REMINDER_INTERVAL } from '../utils/constants';

export function startBookingReminderJob() {
  cron.schedule(BOOKING_REMINDER_INTERVAL, async () => {
    logger.info('📧 Booking reminder check started');

    try {
      const reminderDays = [7, 3, 1]; // Remind 7, 3, and 1 day before

      for (const days of reminderDays) {
        const targetDate = dayjs().add(days, 'day').format('YYYY-MM-DD');

        const bookings = await prisma.booking.findMany({
          where: {
            status: { in: ['CONFIRMED', 'TICKETED'] },
            // Check if any segment departs on the target date
            segments: { path: '$[0].segments[0].departure.at', string_starts_with: targetDate },
          },
          include: { user: true },
        });

        // Fallback: get all confirmed bookings and filter by segments
        const allConfirmed = await prisma.booking.findMany({
          where: { status: { in: ['CONFIRMED', 'TICKETED'] } },
          include: { user: true },
        });

        for (const booking of allConfirmed) {
          try {
            const segments = booking.segments as any;
            let departureDate: string | null = null;

            // Extract departure date from segments
            if (Array.isArray(segments) && segments[0]?.segments) {
              departureDate = segments[0].segments[0]?.departure?.at?.split('T')[0];
            } else if (segments?.checkInDate) {
              departureDate = segments.checkInDate;
            }

            if (!departureDate) continue;

            const daysUntil = dayjs(departureDate).diff(dayjs(), 'day');

            if (reminderDays.includes(daysUntil)) {
              await NotificationService.sendBookingReminder(
                booking.contactEmail,
                booking.user.firstName,
                booking,
                daysUntil
              );

              // WhatsApp reminder
              if (booking.user.notifyWhatsApp && booking.user.phone) {
                await NotificationService.sendWhatsApp(
                  booking.user.phone,
                  `✈️ Reminder: Your ${booking.type.toLowerCase()} trip (PNR: ${booking.pnr}) is in ${daysUntil} day${daysUntil > 1 ? 's' : ''}! Have a great journey!`
                );
              }

              logger.info(`Reminder sent for booking ${booking.pnr} — ${daysUntil} days away`);
            }
          } catch (err) {
            logger.error(`Reminder failed for booking ${booking.id}:`, err);
          }
        }
      }

      logger.info('📧 Booking reminder check completed');
    } catch (error) {
      logger.error('Booking reminder job error:', error);
    }
  });

  logger.info('📋 Booking reminder cron job scheduled (daily at 9 AM)');
}
