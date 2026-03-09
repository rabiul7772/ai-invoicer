import { api } from '../../../services/api';

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

export interface IInvoice {
  _id: string;
  userId: string;
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
  createdAt: string;
  updatedAt: string;
}

export const listInvoices = async (): Promise<IInvoice[]> => {
  const response = await api.get('/invoices');
  return response.data.data;
};
