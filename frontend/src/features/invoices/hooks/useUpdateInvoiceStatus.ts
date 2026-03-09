import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInvoiceStatus } from '../api/updateInvoiceStatus';
import type { UpdateStatusParams } from '../api/updateInvoiceStatus';

export const useUpdateInvoiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateStatusParams) => updateInvoiceStatus(params),
    onSuccess: () => {
      // Invalidate and refetch invoices to show updated status
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    }
  });
};
