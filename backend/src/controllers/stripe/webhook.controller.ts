import type { Request, Response } from 'express';
import { stripe } from '../../config/stripe.js';
import { STRIPE_WEBHOOK_SECRET } from '../../config/env.js';
import {
  processCheckoutCompleted,
  processSubscriptionUpdated,
  processSubscriptionDeleted
} from '../../services/stripe.service.js';

export const handleWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await processCheckoutCompleted(event.data.object);
        break;
      case 'customer.subscription.updated':
        await processSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await processSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing webhook event ${event.type}:`, error);
    // Even if processing fails, we return 200 so Stripe doesn't retry infinitely
  }

  res.json({ received: true });
};
