import { z } from 'zod';

export const sendInvoiceSchema = z.object({
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientEmail: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required')
});

export type SendInvoiceForm = z.infer<typeof sendInvoiceSchema>;
