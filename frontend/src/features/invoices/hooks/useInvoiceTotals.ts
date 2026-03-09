import { useEffect } from 'react';
import type { UseFormSetValue } from 'react-hook-form';
import type { InvoiceFormValues } from '../validation';

export const useInvoiceTotals = (
  items: InvoiceFormValues['items'],
  setValue: UseFormSetValue<InvoiceFormValues>
) => {
  useEffect(() => {
    let subtotal = 0;
    let taxTotal = 0;

    items?.forEach((item, index) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const taxRate = Number(item.tax) || 0;

      const itemSubtotal = quantity * price;
      const itemTax = itemSubtotal * (taxRate / 100);
      const itemTotal = itemSubtotal + itemTax;

      subtotal += itemSubtotal;
      taxTotal += itemTax;

      if (item.total !== itemTotal) {
        setValue(`items.${index}.total` as any, Number(itemTotal.toFixed(2)));
      }
    });

    setValue('subtotal', Number(subtotal.toFixed(2)));
    setValue('taxTotal', Number(taxTotal.toFixed(2)));
    setValue('totalAmount', Number((subtotal + taxTotal).toFixed(2)));
  }, [items, setValue]);
};
