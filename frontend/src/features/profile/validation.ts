import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.email({ error: 'Please enter a valid email address' }),
  businessName: z.string().min(1, 'Business name is required'),
  phoneNumber: z.string().min(11, 'Phone number must be at least 11 digits'),
  address: z.string().min(1, 'Address is required'),
  companyLogoUrl: z.string().optional(),
  avatarUrl: z.string().optional()
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
