import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  avatarUrl: string;
  businessName: string;
  phoneNumber: string;
  address: string;
  companyLogoUrl: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarUrl: { type: String, required: true },
    businessName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    companyLogoUrl: { type: String, required: true }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
