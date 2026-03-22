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
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        await processCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated':
        await processSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        await processSubscriptionDeleted(event.data.object);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`❌ Error processing webhook event ${event.type}:`, error);
  }

  res.json({ received: true });
};
