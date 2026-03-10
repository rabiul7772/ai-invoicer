import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { listInvoices } from '../api/listInvoices';

export const useInvoices = (page: number = 1, limit: number = 6) => {
  return useQuery({
    queryKey: ['invoices', { page, limit }],
    queryFn: () => listInvoices({ page, limit }),
    placeholderData: keepPreviousData
  });
};
