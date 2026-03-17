import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../services/api';
import toast from 'react-hot-toast';

export const useUnsubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post('/stripe/cancel-subscription');
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user data to instantly update the UI back to starter plan
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Successfully unsubscribed.');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to cancel subscription.';
      // We don't want to spam errors if they double click it
      if (message !== 'No active subscription found') {
        toast.error(message);
      }
    }
  });
};
