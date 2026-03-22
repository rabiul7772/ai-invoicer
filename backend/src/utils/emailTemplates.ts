import { FRONTEND_URL } from '../config/env.js';

export const getSubscriptionSuccessEmail = (name: string, plan: string) => {
  const loginUrl = `${FRONTEND_URL}/login`;
  const profileUrl = `${FRONTEND_URL}/profile`;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return `
    <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto;">
      <h2 style="color: #00ff88;">Welcome to AI Invoicer Pro!</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to the <strong>${capitalize(plan)}</strong> 
      plan. Your payment was successful and your account has been upgraded.</p>
      
      <div style="background-color: #f8f9fa; padding: 12px 15px; border-radius: 5px; margin: 15px 0;">
        <p style="margin-top: 0; margin-bottom: 8px; color: #333; font-weight: bold;">Your Plan details:</p>
        <ul style="color: #555; margin-top: 0; margin-bottom: 0;">
          <li>Plan: ${capitalize(plan)}</li>
          <li>Status: Active</li>
          <li>Features: Unlimited AI insights, custom templates & more</li>
        </ul>
      </div>

      <p style="margin-bottom: 15px;">You can start using your new features immediately!</p>
    </div>
  `;
};
