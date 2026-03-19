import { User } from '../models/user.model.js';
import { emailService } from '../utils/emailService.js';
import { getSubscriptionSuccessEmail } from '../utils/emailTemplates.js';

export const processCheckoutCompleted = async (session: any) => {
  const plan = session.metadata?.plan ?? 'professional';
  const userId = session.client_reference_id;

  console.log(`👤 Attempting to update user ${userId} to plan ${plan}`);

  if (!userId) {
    console.error('❌ No client_reference_id found in session. Cannot update user.');
    return;
  }

  // Find user and update plan in one optimized query
  const user = await User.findByIdAndUpdate(
    userId,
    {
      stripeCustomerId: session.customer,
      subscriptionId: session.subscription,
      plan,
      subscriptionStatus: 'active'
    },
    { new: true } // Return the updated document so we have the email
  );

  if (!user) {
    console.error(`❌ User not found with ID: ${userId}`);
    return;
  }

  console.log(`✅ User ${user.email} updated successfully!`);

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
