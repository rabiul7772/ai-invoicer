import { useQuery } from '@tanstack/react-query';
import { getInvoiceById } from '../api/getInvoice';
import { generatePdf } from '../api/generatePdfApi';
import { useEffect } from 'react';

export const INVOICE_DETAILS_QUERY_KEY = 'invoice_details';
export const INVOICE_PDF_QUERY_KEY = 'invoice_pdf';

export const useInvoiceDetails = (id: string | undefined) => {
  // 1. Fetch Invoice Data
  const invoiceQuery = useQuery({
    queryKey: [INVOICE_DETAILS_QUERY_KEY, id],
    queryFn: () => getInvoiceById(id!),
    enabled: !!id,
    select: response => response.data
  });

  // 2. Generate PDF URL based on invoice data
  const pdfQuery = useQuery({
    queryKey: [INVOICE_PDF_QUERY_KEY, id, invoiceQuery.data],
    queryFn: async () => {
      const result = await generatePdf(invoiceQuery.data);
      if (result.success && result.url) {
        return result.url;
      }
      throw new Error(result.message || 'Failed to generate PDF');
    },
    enabled: !!invoiceQuery.data,
    staleTime: Infinity // Don't regenerate PDF unless invoice data changes
  });

  // 3. Cleanup PDF URL on unmount or when the URL changes
  useEffect(() => {
    const url = pdfQuery.data;
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [pdfQuery.data]);

  return {
    invoice: invoiceQuery.data,
    pdfUrl: pdfQuery.data,
    isLoading: invoiceQuery.isPending,
    isGeneratingPdf: pdfQuery.isPending,
    error: invoiceQuery.error || pdfQuery.error,
    isError: invoiceQuery.isError || pdfQuery.isError
  };
};
