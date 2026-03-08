import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { UseFormReturn } from 'react-hook-form';
import { createInvoice } from '../api/createInvoice';
import type { InvoiceFormValues } from '../validation';

export const useSubmitInvoice = (methods: UseFormReturn<InvoiceFormValues>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      setIsSubmitting(true);
      const response = await createInvoice(data);
      if (response.success) {
        toast.success(response.message || 'Invoice created successfully!');
        methods.reset();
        navigate(`/invoice/${response.data._id}`);
      } else {
        toast.error(response.message || 'Failed to create invoice');
      }
    } catch (error: any) {
      console.error('Invoice Creation Error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create invoice. '
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
