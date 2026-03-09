import { useProfileQuery } from '../../profile/hooks/useProfile';
import type { InvoiceFormValues } from '../validation';

export const useInvoiceDefaultValues = (
  initialData?: Partial<InvoiceFormValues>
): InvoiceFormValues => {
  const { data: profile } = useProfileQuery();

  return {
    billFrom: {
      businessName: profile?.businessName || profile?.fullName || '',
      email: profile?.email || '',
      address: profile?.address || '',
      phoneNumber: profile?.phoneNumber || '',
      companyLogoUrl: profile?.companyLogoUrl || ''
    },
    billTo: {
      clientName: initialData?.billTo?.clientName || '',
      clientEmail: initialData?.billTo?.clientEmail || '',
      clientAddress: initialData?.billTo?.clientAddress || '',
      clientPhone: initialData?.billTo?.clientPhone || ''
    },
    items: initialData?.items || [
      { name: '', quantity: 1, price: 0, tax: 0, total: 0 }
    ],
    notes: initialData?.notes || 'Please make payment before the due date.',
    dueDate:
      initialData?.dueDate ||
      (() => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toISOString().split('T')[0];
      })(),
    subtotal: initialData?.subtotal || 0,
    taxTotal: initialData?.taxTotal || 0,
    totalAmount: initialData?.totalAmount || 0,
    status: initialData?.status || 'DRAFT'
  } as InvoiceFormValues;
};
