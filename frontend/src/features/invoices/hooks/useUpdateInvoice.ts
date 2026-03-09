import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoice } from '../api/updateInvoice';
import type { InvoiceFormValues } from '../validation';
import toast from 'react-hot-toast';

export const useUpdateInvoice = (id: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<InvoiceFormValues>) => {
      if (!id) throw new Error('Invoice ID is required for update');
      return updateInvoice(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', id] });
      toast.success('Invoice updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update invoice');
    }
  });
};
