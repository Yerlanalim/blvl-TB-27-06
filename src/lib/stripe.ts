import Stripe from 'stripe';

export const stripe = new Stripe(process.env.NEXT_PRIVATE_STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});
