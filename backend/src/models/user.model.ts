import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  businessName?: string;
  phoneNumber?: string;
  address?: string;
  companyLogoUrl?: string;
  stripeCustomerId?: string;
  subscriptionId?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  subscriptionStatus?: string;
  passwordResetToken?: string | undefined;
  passwordResetExpires?: Date | undefined;
  comparePassword: (password: string) => Promise<boolean>;
  createPasswordResetToken: () => string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatarUrl: { type: String, default: '' },
    businessName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    companyLogoUrl: { type: String, default: '' },
    stripeCustomerId: { type: String },
    subscriptionId: { type: String },
    plan: {
      type: String,
      enum: ['starter', 'professional', 'enterprise'],
      default: 'starter'
    },
    subscriptionStatus: { type: String, default: 'none' },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password!, 12);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password!);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

export const User = model<IUser>('User', userSchema);
