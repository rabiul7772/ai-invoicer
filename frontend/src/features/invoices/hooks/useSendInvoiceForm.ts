import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  sendInvoiceSchema,
  type SendInvoiceForm
} from '../validation/send-invoice.validation';
import { sendInvoiceEmail } from '../api/sendInvoiceEmailApi';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface UseSendInvoiceFormProps {
  invoiceId: string;
  onClose: () => void;
  defaultData: {
    clientName: string;
    clientEmail: string;
    businessName: string;
  };
}

export const useSendInvoiceForm = ({
  invoiceId,
  onClose,
  defaultData
}: UseSendInvoiceFormProps) => {
  const form = useForm<SendInvoiceForm>({
    resolver: zodResolver(sendInvoiceSchema),
    defaultValues: {
      recipientName: defaultData.clientName,
      recipientEmail: defaultData.clientEmail,
      subject: `Invoice from ${defaultData.businessName}`,
      message: `Hi ${defaultData.clientName},\n\nPlease find the attached invoice for our recent business. Let us know if you have any questions.\n\nBest regards,\n${defaultData.businessName}`
    }
  });
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SendInvoiceForm) => {
    setIsLoading(true);
    try {
      await sendInvoiceEmail(invoiceId, {
        recipientEmail: data.recipientEmail,
        subject: data.subject,
        message: data.message
      });
      toast.success('Invoice email sent successfully!');
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', invoiceId] });
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send email.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isLoading,
    formState: form.formState
  };
};
