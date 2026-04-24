import { Router } from 'express';
import express from 'express';
import * as payment from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createPaymentValidation, confirmPaymentValidation } from '../utils/validators';

const router = Router();

// Stripe webhook needs raw body — must be before json parser
router.post('/webhook', express.raw({ type: 'application/json' }), payment.stripeWebhook);

router.use(authenticate);
router.post('/create-intent', validate(createPaymentValidation), payment.createPaymentIntent);
router.post('/confirm', validate(confirmPaymentValidation), payment.confirmPayment);
router.post('/refund', payment.requestRefund);

export { router as paymentRouter };
