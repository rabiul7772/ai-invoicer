import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  businessName?: string;
  phoneNumber?: string;
  address?: string;
  companyLogoUrl?: string;
  comparePassword: (password: string) => Promise<boolean>;
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
    companyLogoUrl: { type: String, default: '' }
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

export const User = model<IUser>('User', userSchema);
