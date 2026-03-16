import Stripe from 'stripe';
import {
  STRIPE_ENTERPRISE_PRICE_ID,
  STRIPE_PROFESSIONAL_PRICE_ID,
  STRIPE_SECRET_KEY
} from './env.js';

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover' as any,
  appInfo: {
    name: 'AI Invoicer',
    version: '1.0.0'
  }
});

export const STRIPE_PLANS = {
  PROFESSIONAL: STRIPE_PROFESSIONAL_PRICE_ID,
  ENTERPRISE: STRIPE_ENTERPRISE_PRICE_ID
};
