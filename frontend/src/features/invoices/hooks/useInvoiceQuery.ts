import { useQuery } from '@tanstack/react-query';
import { getInvoiceById } from '../api/getInvoice';

export const useInvoiceQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => getInvoiceById(id!),
    enabled: !!id
  });
};
