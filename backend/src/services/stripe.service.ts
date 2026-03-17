import { User } from '../models/user.model.js';
import { emailService } from '../utils/emailService.js';
import { getSubscriptionSuccessEmail } from '../utils/emailTemplates.js';

export const processCheckoutCompleted = async (session: any) => {
  const plan = session.metadata?.plan ?? 'professional';

  // Find user and update plan in one optimized query
  const user = await User.findByIdAndUpdate(
    session.client_reference_id,
    {
      stripeCustomerId: session.customer,
      subscriptionId: session.subscription,
      plan,
      subscriptionStatus: 'active'
    },
    { new: true } // Return the updated document so we have the email
  );

  if (user && user.email) {
    // Send confirmation email asynchronously without blocking the webhook
    const htmlEmail = getSubscriptionSuccessEmail(user.fullName, plan);

    emailService
      .sendEmail({
        to: user.email,
        subject: `Subscription Confirmed: ${plan.toUpperCase()} Plan`,
        html: htmlEmail
      })
      .catch(err => console.error('Error sending confirmation email:', err));
  }
};

export const processSubscriptionUpdated = async (subscription: any) => {
  await User.findOneAndUpdate(
    { stripeCustomerId: subscription.customer },
    { subscriptionStatus: subscription.status }
  );
};

export const processSubscriptionDeleted = async (
  subscription: any,
  userId?: string
) => {
  const filter = userId
    ? { _id: userId }
    : { stripeCustomerId: subscription.customer };

  const updatedUser = await User.findOneAndUpdate(
    filter,
    {
      plan: 'starter',
      subscriptionStatus: 'canceled',
      subscriptionId: null
    },
    { new: true }
  );
};
