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

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ListInvoicesResponse {
  data: IInvoice[];
  pagination: PaginationMeta;
}

export interface ListInvoicesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const listInvoices = async (
  params?: ListInvoicesParams
): Promise<ListInvoicesResponse> => {
  const response = await api.get('/invoices', { params });
  return response.data;
};
