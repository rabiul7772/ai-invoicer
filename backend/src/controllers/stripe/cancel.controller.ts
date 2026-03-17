import type { Request, Response } from 'express';
import { stripe } from '../../config/stripe.js';
import { User } from '../../models/user.model.js';
import { processSubscriptionDeleted } from '../../services/stripe.service.js';

export const cancelSubscription = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.subscriptionId) {
      return res.status(400).json({ message: 'No active subscription found' });
    }

    // Cancel the subscription immediately in Stripe
    const canceledSubscription = await stripe.subscriptions.cancel(
      user.subscriptionId
    );

    // Call our existing webhook logic synchronously to update the local DB
    await processSubscriptionDeleted(canceledSubscription, userId);

    res.status(200).json({
      status: 'success',
      message: 'Subscription successfully canceled.'
    });
  } catch (error: any) {
    console.error('Cancellation error:', error.message);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error configuring unsubscription'
    });
  }
};
