/**
 * Booking state machine — handles the full booking lifecycle
 */
import { prisma } from '../config/database';
import { AmadeusService } from './amadeus.service';
import { StripeService } from './stripe.service';
import { NotificationService } from './notification.service';
import { CacheService } from './cache.service';
import { logger } from '../utils/logger';
import { generatePNR, sanitizeUser } from '../utils/helpers';
import { AppError, NotFoundError, BadRequestError } from '../utils/errors';
import { BookingStatus, BookingType } from '@prisma/client';

export class BookingService {
  /**
   * Create a new flight booking
   */
  static async createFlightBooking(
    userId: string,
    flightOffer: any,
    passengers: any[],
    contactEmail: string,
    contactPhone: string,
    specialRequests?: string
  ) {
    // 1. Confirm price is still valid
    const priceConfirmation = await AmadeusService.confirmFlightPrice(flightOffer);
    const confirmedOffer = priceConfirmation.flightOffers[0];
    const totalAmount = parseFloat(confirmedOffer.price.grandTotal);
    const currency = confirmedOffer.price.currency;

    // 2. Generate unique PNR
    let pnr = generatePNR();
    let exists = await prisma.booking.findUnique({ where: { pnr } });
    while (exists) {
      pnr = generatePNR();
      exists = await prisma.booking.findUnique({ where: { pnr } });
    }

    // 3. Create booking record
    const booking = await prisma.booking.create({
      data: {
        userId,
        type: 'FLIGHT',
        status: 'PENDING',
        pnr,
        totalAmount,
        currency,
        passengers: JSON.parse(JSON.stringify(passengers)),
        segments: JSON.parse(JSON.stringify(confirmedOffer.itineraries)),
        contactEmail,
        contactPhone,
        specialRequests,
      },
      include: { user: true },
    });

    logger.info(`Flight booking created: ${pnr} by user ${userId}`);

    // 4. Create payment intent
    const payment = await StripeService.createPaymentIntent(booking.id, totalAmount, currency);

    return {
      booking: { ...booking, user: undefined },
      pnr,
      totalAmount,
      currency,
      clientSecret: payment.clientSecret,
      paymentIntentId: payment.paymentIntentId,
      confirmedOffer,
    };
  }

  /**
   * Create a new hotel booking
   */
  static async createHotelBooking(
    userId: string,
    hotelOffer: any,
    passengers: any[],
    contactEmail: string,
    contactPhone: string,
    specialRequests?: string
  ) {
    const totalAmount = parseFloat(hotelOffer.price?.total || hotelOffer.offers?.[0]?.price?.total || '0');
    const currency = hotelOffer.price?.currency || hotelOffer.offers?.[0]?.price?.currency || 'INR';

    let pnr = generatePNR();
    let exists = await prisma.booking.findUnique({ where: { pnr } });
    while (exists) {
      pnr = generatePNR();
      exists = await prisma.booking.findUnique({ where: { pnr } });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        type: 'HOTEL',
        status: 'PENDING',
        pnr,
        totalAmount,
        currency,
        passengers: JSON.parse(JSON.stringify(passengers)),
        segments: JSON.parse(JSON.stringify(hotelOffer)),
        contactEmail,
        contactPhone,
        specialRequests,
      },
      include: { user: true },
    });

    logger.info(`Hotel booking created: ${pnr} by user ${userId}`);

    const payment = await StripeService.createPaymentIntent(booking.id, totalAmount, currency);

    return {
      booking: { ...booking, user: undefined },
      pnr,
      totalAmount,
      currency,
      clientSecret: payment.clientSecret,
      paymentIntentId: payment.paymentIntentId,
    };
  }

  /**
   * Confirm booking after successful payment
   */
  static async confirmBooking(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, payment: true },
    });

    if (!booking) throw new NotFoundError('Booking not found');
    if (booking.status !== 'PENDING') throw new BadRequestError('Booking is not pending');

    // If flight, create the actual order with Amadeus
    if (booking.type === 'FLIGHT') {
      try {
        const travelers = (booking.passengers as any[]).map((p: any, i: number) => ({
          id: `${i + 1}`,
          dateOfBirth: p.dateOfBirth,
          name: { firstName: p.firstName.toUpperCase(), lastName: p.lastName.toUpperCase() },
          gender: p.gender === 'male' ? 'MALE' : 'FEMALE',
          contact: {
            emailAddress: booking.contactEmail,
            phones: [{ deviceType: 'MOBILE', countryCallingCode: '91', number: booking.contactPhone }],
          },
          documents: p.passportNumber
            ? [
                {
                  documentType: 'PASSPORT',
                  number: p.passportNumber,
                  expiryDate: p.passportExpiry,
                  issuanceCountry: p.nationality,
                  nationality: p.nationality,
                  holder: true,
                },
              ]
            : undefined,
        }));

        // Note: In production, the flight offer would be stored and passed here
        // For now, we update the status
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CONFIRMED' },
        });
      } catch (error) {
        logger.error('Amadeus order creation failed after payment:', error);
        // Still mark as confirmed — manual resolution needed
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CONFIRMED' },
        });
      }
    } else {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CONFIRMED' },
      });
    }

    // Send confirmation notification
    await NotificationService.sendBookingConfirmation(
      booking.contactEmail,
      booking.user.firstName,
      booking
    );

    logger.info(`Booking confirmed: ${booking.pnr}`);

    // Clear user bookings cache
    await CacheService.delPattern(`user:${booking.userId}:bookings:*`);

    return booking;
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(bookingId: string, userId: string) {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: { payment: true },
    });

    if (!booking) throw new NotFoundError('Booking not found');

    const cancellableStatuses: BookingStatus[] = ['PENDING', 'CONFIRMED', 'TICKETED'];
    if (!cancellableStatuses.includes(booking.status)) {
      throw new BadRequestError(`Cannot cancel booking with status: ${booking.status}`);
    }

    // Process refund if payment was made
    if (booking.payment && booking.payment.status === 'SUCCEEDED') {
      await StripeService.refund(booking.payment.stripePaymentIntentId);
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    await CacheService.delPattern(`user:${userId}:bookings:*`);

    logger.info(`Booking cancelled: ${booking.pnr}`);

    return { message: 'Booking cancelled successfully', pnr: booking.pnr };
  }

  /**
   * Get booking by ID
   */
  static async getBookingById(bookingId: string, userId: string) {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: { payment: true, reviews: true },
    });

    if (!booking) throw new NotFoundError('Booking not found');
    return booking;
  }

  /**
   * Get booking by PNR
   */
  static async getBookingByPNR(pnr: string, userId: string) {
    const booking = await prisma.booking.findFirst({
      where: { pnr, userId },
      include: { payment: true },
    });

    if (!booking) throw new NotFoundError('Booking not found');
    return booking;
  }
}
