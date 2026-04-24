/**
 * Stripe payment logic — create intents, confirm, refund
 */
import { stripe } from '../config/stripe';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import { AppError } from '../utils/errors';
import { PaymentStatus } from '@prisma/client';

export class StripeService {
  /**
   * Create a payment intent for a booking
   */
  static async createPaymentIntent(bookingId: string, amount: number, currency = 'inr') {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { user: true },
      });

      if (!booking) throw new AppError('Booking not found', 404);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe uses cents/paise
        currency: currency.toLowerCase(),
        metadata: {
          bookingId: booking.id,
          userId: booking.userId,
          type: booking.type,
          pnr: booking.pnr,
        },
        description: `Bharat Ghumho - ${booking.type} booking ${booking.pnr}`,
      });

      // Create payment record in DB
      await prisma.payment.create({
        data: {
          bookingId: booking.id,
          stripePaymentIntentId: paymentIntent.id,
          amount,
          currency: currency.toUpperCase(),
          status: 'PENDING',
        },
      });

      logger.info(`Payment intent created: ${paymentIntent.id} for booking ${booking.pnr}`);

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      logger.error('Stripe payment intent error:', error.message);
      throw new AppError('Payment creation failed', 500);
    }
  }

  /**
   * Handle successful payment (called from webhook or confirmation)
   */
  static async handlePaymentSuccess(paymentIntentId: string) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (!payment) {
        logger.warn(`Payment not found for intent: ${paymentIntentId}`);
        return;
      }

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'SUCCEEDED', paidAt: new Date() },
        }),
        prisma.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'CONFIRMED' },
        }),
      ]);

      logger.info(`Payment succeeded: ${paymentIntentId}`);
    } catch (error) {
      logger.error('Payment success handler error:', error);
    }
  }

  /**
   * Handle failed payment
   */
  static async handlePaymentFailure(paymentIntentId: string, failureReason?: string) {
    try {
      await prisma.payment.update({
        where: { stripePaymentIntentId: paymentIntentId },
        data: { status: 'FAILED', failureReason },
      });

      logger.warn(`Payment failed: ${paymentIntentId} — ${failureReason}`);
    } catch (error) {
      logger.error('Payment failure handler error:', error);
    }
  }

  /**
   * Process refund
   */
  static async refund(paymentIntentId: string, amount?: number) {
    try {
      const payment = await prisma.payment.findUnique({
        where: { stripePaymentIntentId: paymentIntentId },
      });

      if (!payment) throw new AppError('Payment not found', 404);
      if (payment.status !== 'SUCCEEDED') throw new AppError('Payment has not succeeded', 400);

      const refundParams: any = { payment_intent: paymentIntentId };
      if (amount) {
        refundParams.amount = Math.round(amount * 100);
      }

      const refund = await stripe.refunds.create(refundParams);

      const refundAmount = amount || Number(payment.amount);
      const isPartial = amount && amount < Number(payment.amount);

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: isPartial ? 'PARTIALLY_REFUNDED' : 'REFUNDED',
            refundAmount,
            refundId: refund.id,
          },
        }),
        prisma.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'REFUNDED' },
        }),
      ]);

      logger.info(`Refund processed: ${refund.id} for ${paymentIntentId}`);

      return { refundId: refund.id, amount: refundAmount };
    } catch (error: any) {
      if (error instanceof AppError) throw error;
      logger.error('Stripe refund error:', error.message);
      throw new AppError('Refund failed', 500);
    }
  }

  /**
   * Verify Stripe webhook signature
   */
  static verifyWebhookSignature(payload: Buffer, signature: string): any {
    try {
      return stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (error) {
      logger.error('Webhook signature verification failed');
      throw new AppError('Invalid webhook signature', 400);
    }
  }
}
