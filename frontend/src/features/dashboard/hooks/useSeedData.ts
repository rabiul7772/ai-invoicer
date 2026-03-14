import { useMutation, useQueryClient } from '@tanstack/react-query';
import { seedApi } from '../api/seed.api';
import { toast } from 'react-hot-toast';

export const useSeedDemoData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: seedApi.seedDemoData,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      toast.success(data.message || 'Demo data seeded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to seed demo data');
    }
  });
};
