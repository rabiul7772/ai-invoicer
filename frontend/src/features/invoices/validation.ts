import { z } from 'zod';

export const invoiceItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Qty must be at least 1'),
  price: z.number().min(0, 'Price cannot be negative'),
  tax: z
    .number()
    .min(0, 'Tax cannot be negative')
    .max(100, 'Tax cannot exceed 100%'),
  total: z.number().min(0)
});

export const invoiceSchema = z.object({
  billFrom: z.object({
    businessName: z.string().min(1, 'Business name is required'),
    email: z.string().email('Invalid email'),
    address: z.string().min(1, 'Address is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    companyLogoUrl: z.string().optional()
  }),
  billTo: z.object({
    clientName: z.string().min(1, 'Client name is required'),
    clientEmail: z.string().email('Invalid client email'),
    clientAddress: z.string().min(1, 'Client address is required'),
    clientPhone: z.string().min(1, 'Client phone is required')
  }),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  subtotal: z.number().min(0),
  taxTotal: z.number().min(0),
  totalAmount: z.number().min(0),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE'])
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
