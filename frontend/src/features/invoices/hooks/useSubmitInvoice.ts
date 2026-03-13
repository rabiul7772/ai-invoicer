import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { UseFormReturn } from 'react-hook-form';
import { createInvoice } from '../api/createInvoice';
import { updateInvoice } from '../api/updateInvoice';
import type { InvoiceFormValues } from '../validation';

export const useSubmitInvoice = (
  methods: UseFormReturn<InvoiceFormValues>,
  id?: string
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      setIsSubmitting(true);
      const isEditing = !!id;

      const response = isEditing
        ? await updateInvoice(id, data)
        : await createInvoice(data);

      if (response.success) {
        toast.success(
          response.message ||
            `Invoice ${isEditing ? 'updated' : 'created'} successfully!`
        );
        methods.reset();
        navigate(`/invoices/${response.data._id}`);
      } else {
        toast.error(
          response.message ||
            `Failed to ${isEditing ? 'update' : 'create'} invoice`
        );
      }
    } catch (error: any) {
      console.error('Invoice Submission Error:', error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${id ? 'update' : 'create'} invoice.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting };
};
