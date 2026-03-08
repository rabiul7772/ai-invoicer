import { api } from '../../../services/api';

export const getInvoiceById = async (id: string) => {
  const { data } = await api.get(`/invoices/${id}`);
  return data;
};
