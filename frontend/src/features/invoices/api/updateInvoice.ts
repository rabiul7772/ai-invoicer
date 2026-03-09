import { api } from '../../../services/api';
import type { InvoiceFormValues } from '../validation';

export const updateInvoice = async (
  id: string,
  data: Partial<InvoiceFormValues>
) => {
  const response = await api.put(`/invoices/${id}`, data);
  return response.data;
};
