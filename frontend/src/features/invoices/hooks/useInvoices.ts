import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDeferredValue } from 'react';
import { listInvoices } from '../api/listInvoices';

export const useInvoices = (
  page: number = 1,
  limit: number = 7,
  search: string = '',
  status: string = ''
) => {
  const deferredSearch = useDeferredValue(search);

  return useQuery({
    queryKey: ['invoices', { page, limit, search: deferredSearch, status }],
    queryFn: () =>
      listInvoices({ page, limit, search: deferredSearch, status }),
    placeholderData: keepPreviousData
  });
};
