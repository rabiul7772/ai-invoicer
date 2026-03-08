import { api } from '../../../services/api';

export interface SendEmailPayload {
  recipientEmail: string;
  subject: string;
  message: string;
}

export const sendInvoiceEmail = async (
  id: string,
  payload: SendEmailPayload
) => {
  const { data } = await api.post(`/invoices/${id}/send`, payload);
  return data;
};
