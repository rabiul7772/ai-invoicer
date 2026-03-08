import { api } from '../../../services/api';
import type { InvoiceFormValues } from '../validation';

export const generatePdf = async (
  data: InvoiceFormValues
): Promise<{ success: boolean; url?: string; message?: string }> => {
  try {
    const response = await api.post('/invoices/generate-pdf', data, {
      responseType: 'blob' // Important, otherwise we just get unparseable text
    });

    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return {
      success: true,
      url: pdfUrl,
      message: 'PDF generated successfully'
    };
  } catch (error: any) {
    console.error('PDF Generation API Error:', error);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Failed to generate PDF on server. Please ensure Chrome/Chromium is installed correctly.'
    };
  }
};
