import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { listInvoices } from '../api/listInvoices';

export const useInvoices = (
  page: number = 1,
  limit: number = 7,
  search: string = ''
) => {
  const deferredSearch = useDeferredValue(search);

  return useQuery({
    queryKey: ['invoices', { page, limit, search: deferredSearch }],
    queryFn: () => listInvoices({ page, limit, search: deferredSearch }),
    placeholderData: keepPreviousData
  });
};
