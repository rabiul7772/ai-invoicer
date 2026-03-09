import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInvoice } from '../api/deleteInvoice';
import toast from 'react-hot-toast';

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: response => {
      toast.success(response.message || 'Invoice deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete invoice');
    }
  });
};
