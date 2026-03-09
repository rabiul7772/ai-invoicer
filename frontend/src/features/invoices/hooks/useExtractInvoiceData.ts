import { useMutation } from '@tanstack/react-query';
import { extractInvoiceData } from '../api/extractInvoiceData';
import { toast } from 'react-hot-toast';

export const useExtractInvoiceData = () => {
  const { mutate: extractData, isPending: isExtracting } = useMutation({
    mutationFn: extractInvoiceData,
    onSuccess: () => {
      toast.success('Invoice data extracted successfully!');
    },
    onError: (error: any) => {
      console.error('Extraction error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to extract invoice data'
      );
    }
  });

  return { extractData, isExtracting };
};
