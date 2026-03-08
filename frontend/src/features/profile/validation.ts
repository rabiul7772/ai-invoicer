import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z
    .email('Invalid email format')
    .regex(emailRegex, 'Please enter a valid email address'),
  businessName: z.string().min(1, 'Business name is required'),
  phoneNumber: z.string().min(11, 'Phone number must be at least 11 digits'),
  address: z.string().min(1, 'Address is required'),
  companyLogoUrl: z.url('Invalid company logo URL'),
  avatarUrl: z.url('Invalid avatar URL')
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
