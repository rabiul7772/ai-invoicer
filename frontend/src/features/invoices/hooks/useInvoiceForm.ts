import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useLocation } from 'react-router';
import { invoiceSchema, type InvoiceFormValues } from '../validation';
import { useInvoiceTotals } from './useInvoiceTotals';
import { useInvoiceDefaultValues } from './useInvoiceDefaultValues';
import { useInvoiceQuery } from './useInvoiceQuery';

export const useInvoiceForm = (initialData?: Partial<InvoiceFormValues>) => {
  const { id } = useParams();
  const location = useLocation();
  const { data: invoiceResult, isLoading: isFetchingInvoice } =
    useInvoiceQuery(id);

  const defaultValues = useInvoiceDefaultValues(
    location.state?.aiData || invoiceResult?.data || initialData
  );

  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    values: defaultValues
  });

  const { control, setValue } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const items = useWatch({
    control,
    name: 'items'
  });

  useInvoiceTotals(items, setValue);

  return {
    methods,
    fields,
    append,
    remove,
    isEditing: !!id,
    id,
    isLoading: isFetchingInvoice,
    totals: {
      subtotal: methods.watch('subtotal'),
      taxTotal: methods.watch('taxTotal'),
      totalAmount: methods.watch('totalAmount')
    }
  };
};
