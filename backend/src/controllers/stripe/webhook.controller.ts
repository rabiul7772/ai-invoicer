import type { Request, Response } from 'express';
import { stripe } from '../../config/stripe.js';
import { STRIPE_WEBHOOK_SECRET } from '../../config/env.js';
import { User } from '../../models/user.model.js';

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const plan = session.metadata?.plan ?? 'professional';

    await User.findByIdAndUpdate(session.client_reference_id, {
      stripeCustomerId: session.customer,
      subscriptionId: session.subscription,
      plan,
      subscriptionStatus: 'active'
    });
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as any;
    const status = subscription.status;

    await User.findOneAndUpdate(
      { stripeCustomerId: subscription.customer },
      { subscriptionStatus: status }
    );
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as any;

    await User.findOneAndUpdate(
      { stripeCustomerId: subscription.customer },
      {
        plan: 'starter',
        subscriptionStatus: 'canceled',
        subscriptionId: null
      }
    );
  }

  res.json({ received: true });
};
