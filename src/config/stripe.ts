import Stripe from "stripe";

/**
 * Stripe SDK client for payment workflows.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2025-08-27.basil"
});
