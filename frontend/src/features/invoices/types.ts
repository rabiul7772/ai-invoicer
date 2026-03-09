export interface InvoiceItem {
  id: string; // Used for RHF field array key
  name: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

export interface Invoice {
  _id?: string;
  invoiceNumber: string;
  billFrom: {
    businessName: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
  billTo: {
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientPhone?: string;
  };
  items: InvoiceItem[];
  notes: string;
  dueDate: string;
  subtotal: number;
  taxTotal: number;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'PAID';
  createdAt: string;
}
