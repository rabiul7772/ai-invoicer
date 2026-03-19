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

  console.log('🔔 Webhook received! Signature:', sig ? 'Present' : 'Missing');

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Webhook signature verified. Event type:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook Signature Verification Failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        console.log('📦 Processing checkout.session.completed', {
          id: session.id,
          client_reference_id: session.client_reference_id,
          customer: session.customer,
          plan: session.metadata?.plan
        });
        await processCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated':
        console.log('🔄 Processing customer.subscription.updated');
        await processSubscriptionUpdated(event.data.object);
        break;
      case 'customer.subscription.deleted':
        console.log('🗑️ Processing customer.subscription.deleted');
        await processSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`❌ Error processing webhook event ${event.type}:`, error);
  }

  res.json({ received: true });
};
