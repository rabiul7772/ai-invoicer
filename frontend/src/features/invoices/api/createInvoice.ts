import { api } from '../../../services/api';
import type { InvoiceFormValues } from '../validation';

export interface CreateInvoiceResponse {
  success: boolean;
  message: string;
  data: any;
}

export const createInvoice = async (
  invoiceData: InvoiceFormValues
): Promise<CreateInvoiceResponse> => {
  const { data } = await api.post<CreateInvoiceResponse>(
    '/invoices',
    invoiceData
  );
  return data;
};
