import { api } from '../../../services/api';

export interface ExtractedInvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ExtractedInvoiceData {
  clientName: string;
  email: string;
  address: string;
  items: ExtractedInvoiceItem[];
}

export const extractInvoiceData = async (
  text: string
): Promise<ExtractedInvoiceData> => {
  const response = await api.post('/ai/extract', { text });
  return response.data.data;
};
