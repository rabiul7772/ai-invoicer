import { useQuery } from '@tanstack/react-query';
import { listInvoices } from '../api/listInvoices';

export const useInvoices = () => {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: listInvoices
  });
};
