import type { Response, NextFunction } from 'express';
import { stripe, STRIPE_PLANS } from '../../config/stripe.js';
import { FRONTEND_URL } from '../../config/env.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const createCheckoutSession = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { planId } = req.body; // 'PROFESSIONAL' or 'ENTERPRISE'
    const priceId = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS];

    if (!req.user || !req.user._id) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'User not authenticated' });
    }

    if (!priceId) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid plan selected' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      ...(req.user.stripeCustomerId
        ? { customer: req.user.stripeCustomerId }
        : { customer_email: req.user.email }),
      client_reference_id: req.user._id.toString(),
      metadata: {
        plan: planId.toLowerCase()
      },
      custom_text: {
        submit: {
          message:
            '🧪 TEST MODE: Please use card number 4242 4242 4242 4242 with any future expiry date (e.g., 12/34) and any CVC (e.g., 123) to complete this test transaction.'
        }
      },
      success_url: `${FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/#pricing`
    });

    res.status(200).json({ status: 'success', url: session.url });
  } catch (error) {
    next(error);
  }
};
