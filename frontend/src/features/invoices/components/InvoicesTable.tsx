import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useInvoices } from '../hooks/useInvoices';
import { InvoiceRow } from './InvoiceRow';
import { Loader2 } from 'lucide-react';
import { SendInvoiceModal } from './SendInvoiceModal';
import { InvoicesPagination } from './InvoicesPagination';
import type { IInvoice } from '../api/listInvoices';
import { INVOICE_PER_PAGE } from '../../../constants';

export const InvoicesTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };

  const {
    data: response,
    isLoading,
    error
  } = useInvoices(page, INVOICE_PER_PAGE, search, status);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);

  const invoices = response?.data;
  const total = response?.pagination?.total || 0;

  if (isLoading) {
    return (
      <div className="card-premium p-8 flex flex-col items-center justify-center gap-4 text-(--color-text-dim)">
        <Loader2 className="w-8 h-8 animate-spin text-(--color-primary)" />
        <p className="text-sm">Loading invoices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-premium p-8 text-center text-red-400">
        <p className="text-sm">
          Failed to load invoices. Please try again later.
        </p>
      </div>
    );
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="card-premium p-8 text-center text-(--color-text-dim)">
        <p className="text-sm font-medium mb-1">No invoices found</p>
        <p className="text-xs">Create your first invoice to get started.</p>
      </div>
    );
  }

  return (
    <div className="card-premium md:p-0! overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.05)] text-left">
              <th className="py-2.5 pl-6 md:w-auto whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim) hidden sm:table-cell">
                Invoice #
              </th>
              <th className="py-2.5 pr-6 md:pr-4 md:min-w-0 whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim)">
                Client
              </th>
              <th className="py-2.5 pr-6 md:pr-4 md:w-auto whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim)">
                Amount
              </th>
              <th className="py-2.5 pr-6 md:pr-4 md:w-auto whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim) hidden sm:table-cell">
                Due Date
              </th>
              <th className="py-2.5 pr-6 md:pr-4 md:w-auto whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim)">
                Status
              </th>
              <th className="py-2.5 pr-6 md:pr-4 text-right whitespace-nowrap text-[9px] font-black uppercase tracking-widest text-(--color-text-dim)">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(255,255,255,0.02)]">
            {invoices.map(invoice => (
              <InvoiceRow
                key={invoice._id}
                {...invoice}
                onSendEmail={data => setSelectedInvoice(data)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {total > INVOICE_PER_PAGE && (
        <InvoicesPagination
          currentPage={page}
          totalCount={total}
          pageSize={INVOICE_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}

      {selectedInvoice && (
        <SendInvoiceModal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoiceId={selectedInvoice._id}
          status={selectedInvoice.status}
          defaultData={{
            clientName: selectedInvoice.billTo.clientName,
            clientEmail: selectedInvoice.billTo.clientEmail,
            businessName: selectedInvoice.billFrom.businessName
          }}
        />
      )}
    </div>
  );
};
