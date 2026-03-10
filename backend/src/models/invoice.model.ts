import { Schema, model, Document, Types } from 'mongoose';

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

export interface IInvoice extends Document {
  userId: Types.ObjectId;
  billFrom: {
    businessName: string;
    email: string;
    address: string;
    phoneNumber: string;
    companyLogoUrl?: string;
  };
  billTo: {
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientPhone?: string;
  };
  items: IInvoiceItem[];
  notes?: string;
  dueDate: string;
  subtotal: number;
  taxTotal: number;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
}

const invoiceItemSchema = new Schema<IInvoiceItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  tax: { type: Number, required: true, min: 0, max: 100 },
  total: { type: Number, required: true, min: 0 }
});

const invoiceSchema = new Schema<IInvoice>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    billFrom: {
      businessName: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      companyLogoUrl: { type: String }
    },
    billTo: {
      clientName: { type: String, required: true },
      clientEmail: { type: String, required: true },
      clientAddress: { type: String, required: true },
      clientPhone: { type: String }
    },
    items: {
      type: [invoiceItemSchema],
      validate: [
        (v: IInvoiceItem[]) => v.length > 0,
        'At least one item is required'
      ]
    },
    notes: { type: String },
    dueDate: { type: String, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    taxTotal: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['DRAFT', 'SENT', 'PAID', 'OVERDUE'],
      default: 'DRAFT'
    }
  },
  { timestamps: true }
);

export const Invoice = model<IInvoice>('Invoice', invoiceSchema);
