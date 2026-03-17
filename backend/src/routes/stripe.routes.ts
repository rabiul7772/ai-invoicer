import { Router } from 'express';
import * as stripeController from '../controllers/stripe.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const paymentRouter = Router();

paymentRouter.post(
  '/create-checkout-session',
  protect as any,
  stripeController.createCheckoutSession
);

paymentRouter.post(
  '/cancel-subscription',
  protect as any,
  stripeController.cancelSubscription
);

export default paymentRouter;
