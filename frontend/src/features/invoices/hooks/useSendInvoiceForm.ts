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
  status: string;
  defaultData: {
    clientName: string;
    clientEmail: string;
    businessName: string;
  };
  onSuccess?: () => void;
}

export const useSendInvoiceForm = ({
  invoiceId,
  onClose,
  status,
  defaultData,
  onSuccess
}: UseSendInvoiceFormProps) => {
  const getDefaultMessage = () => {
    if (status === 'OVERDUE') {
      return `Hi ${defaultData.clientName},\n\nThis is a reminder that your invoice is already overdue. We would appreciate it if you could settle the sufficient balance as soon as possible.\n\nBest regards,\n${defaultData.businessName}`;
    }
    if (status === 'SENT') {
      return `Hi ${defaultData.clientName},\n\nJust a friendly reminder regarding your outstanding invoice. Please find the attached copy for your reference.\n\nBest regards,\n${defaultData.businessName}`;
    }
    return `Hi ${defaultData.clientName},\n\nPlease find the attached invoice for our recent business. Let us know if you have any questions.\n\nBest regards,\n${defaultData.businessName}`;
  };

  const form = useForm<SendInvoiceForm>({
    resolver: zodResolver(sendInvoiceSchema),
    defaultValues: {
      recipientName: defaultData.clientName,
      recipientEmail: defaultData.clientEmail,
      subject:
        status === 'DRAFT'
          ? `Invoice from ${defaultData.businessName}`
          : `Reminder: Invoice from ${defaultData.businessName}`,
      message: getDefaultMessage()
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
      onSuccess?.();
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
