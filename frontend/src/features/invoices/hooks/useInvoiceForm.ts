import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { invoiceSchema, type InvoiceFormValues } from '../validation';
import { useProfileQuery } from '../../profile/hooks/useProfile';

/**
 * useInvoiceForm
 * --------------
 * A custom hook that manages all the state and logic for the Create Invoice form.
 */
export const useInvoiceForm = (initialData?: Partial<InvoiceFormValues>) => {
  const { data: profile } = useProfileQuery();

  // ─── 1. FORM SETUP ───────────────────────────────────────────────────────────
  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      billFrom: {
        businessName: profile?.businessName || profile?.fullName || '',
        email: profile?.email || '',
        address: profile?.address || '',
        phoneNumber: profile?.phoneNumber || '',
        companyLogoUrl: profile?.companyLogoUrl || ''
      },
      billTo: {
        clientName: '',
        clientEmail: '',
        clientAddress: '',
        clientPhone: ''
      },
      // Start with one empty item row so the table is never blank
      items: [{ name: '', quantity: 1, price: 0, tax: 0, total: 0 }],
      notes: 'Please make payment before the due date.',
      dueDate: new Date().toISOString().split('T')[0], // today's date as default
      subtotal: 0,
      taxTotal: 0,
      totalAmount: 0,
      status: 'DRAFT',
      // Allow passing pre-filled data (e.g. when editing an existing invoice)
      ...initialData
    } as InvoiceFormValues
  });

  const { control, setValue, getValues } = methods;

  // Auto-fill Bill From when profile data loads asynchronously
  useEffect(() => {
    if (profile && !initialData) {
      const currentBillFrom = getValues('billFrom');
      // Only auto-fill if the user hasn't typed anything in the business name yet
      if (!currentBillFrom.businessName && !currentBillFrom.email) {
        setValue(
          'billFrom.businessName',
          profile.businessName || profile.fullName || ''
        );
        setValue('billFrom.email', profile.email || '');
        setValue('billFrom.address', profile.address || '');
        setValue('billFrom.phoneNumber', profile.phoneNumber || '');
        setValue('billFrom.companyLogoUrl', profile.companyLogoUrl || '');
      }
    }
  }, [profile, initialData, setValue, getValues]);

  // ─── 2. DYNAMIC LINE ITEMS ───────────────────────────────────────────────────
  // useFieldArray manages the array of invoice items.
  //  - fields  → the current list of item rows
  //  - append  → adds a new item row at the end
  //  - remove  → removes an item row by its index
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  // ─── 3. WATCH ITEMS FOR LIVE CALCULATION ─────────────────────────────────────
  // useWatch subscribes to changes in the `items` array without triggering a
  // full re-render of the parent component — keeps performance tight.
  const items = useWatch({
    control,
    name: 'items'
  });

  // ─── 4. AUTO-CALCULATE TOTALS ────────────────────────────────────────────────
  // Runs every time any item field changes (quantity, price, or tax).
  // Updates:
  //   • items[n].total  → (qty × price) + tax amount
  //   • subtotal        → sum of (qty × price) across all items
  //   • taxTotal        → sum of all tax amounts across all items
  //   • totalAmount     → subtotal + taxTotal
  useEffect(() => {
    let subtotal = 0;
    let taxTotal = 0;

    items?.forEach((item, index) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      const taxRate = Number(item.tax) || 0; // tax is a percentage, e.g. 10 = 10%

      const itemSubtotal = quantity * price; // before tax
      const itemTax = itemSubtotal * (taxRate / 100); // tax amount for this item
      const itemTotal = itemSubtotal + itemTax; // after tax

      // Accumulate into overall totals
      subtotal += itemSubtotal;
      taxTotal += itemTax;

      // Only write back to the form if the value actually changed (avoids infinite loop)
      if (item.total !== itemTotal) {
        setValue(`items.${index}.total` as any, Number(itemTotal.toFixed(2)));
      }
    });

    // Push the final totals back into the form so they can be submitted / displayed
    setValue('subtotal', Number(subtotal.toFixed(2)));
    setValue('taxTotal', Number(taxTotal.toFixed(2)));
    setValue('totalAmount', Number((subtotal + taxTotal).toFixed(2)));
  }, [items, setValue]);

  // ─── 5. RETURN VALUES ────────────────────────────────────────────────────────
  // Expose everything the InvoiceForm component needs:
  //  - methods → the full react-hook-form object (register, handleSubmit, etc.)
  //  - fields  → the array of item rows for rendering the table
  //  - append / remove → for the "+ Add Item" and delete buttons
  //  - totals  → live subtotal / tax / grand total for the summary panel
  return {
    methods,
    fields,
    append,
    remove,
    totals: {
      subtotal: methods.watch('subtotal'),
      taxTotal: methods.watch('taxTotal'),
      totalAmount: methods.watch('totalAmount')
    }
  };
};
