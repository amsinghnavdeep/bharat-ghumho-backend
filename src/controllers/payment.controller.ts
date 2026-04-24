/**
 * Payment controller — create intents, handle webhooks
 */
import { Request, Response, NextFunction } from 'express';
import { StripeService } from '../services/stripe.service';
import { BookingService } from '../services/booking.service';
import { BadRequestError } from '../utils/errors';
import { logger } from '../utils/logger';

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookingId, currency } = req.body;

    const booking = await BookingService.getBookingById(bookingId, req.user!.id);
    const result = await StripeService.createPaymentIntent(
      bookingId, Number(booking.totalAmount), currency || booking.currency
    );

    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentIntentId } = req.body;
    await StripeService.handlePaymentSuccess(paymentIntentId);
    res.json({ success: true, message: 'Payment confirmed' });
  } catch (error) { next(error); }
};

export const requestRefund = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentIntentId, amount } = req.body;
    const result = await StripeService.refund(paymentIntentId, amount);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const stripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    if (!sig) throw new BadRequestError('Missing Stripe signature');

    const event = StripeService.verifyWebhookSignature(req.body, sig);

    switch (event.type) {
      case 'payment_intent.succeeded':
        await StripeService.handlePaymentSuccess(event.data.object.id);
        break;
      case 'payment_intent.payment_failed':
        await StripeService.handlePaymentFailure(
          event.data.object.id,
          event.data.object.last_payment_error?.message
        );
        break;
      default:
        logger.info(`Unhandled Stripe event: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) { next(error); }
};
