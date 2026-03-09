import { api } from '../../../services/api';

export const deleteInvoice = async (id: string) => {
  const response = await api.delete(`/invoices/${id}`);
  return response.data;
};
