import { api } from '../../../services/api';

export interface UpdateStatusParams {
  id: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
}

export const updateInvoiceStatus = async ({
  id,
  status
}: UpdateStatusParams) => {
  const { data } = await api.patch(`/invoices/${id}/status`, { status });
  return data;
};
