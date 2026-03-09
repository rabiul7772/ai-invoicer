import { DashboardLayout } from '../components/layout/DashboardLayout';
import { InvoicesHeader } from '../features/invoices/components/InvoicesHeader';
import { InvoicesFilters } from '../features/invoices/components/InvoicesFilters';
import { InvoicesTable } from '../features/invoices/components/InvoicesTable';
import { InvoicesPagination } from '../features/invoices/components/InvoicesPagination';

const Invoices = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-2">
        <InvoicesHeader />
        <InvoicesFilters />
        <InvoicesTable />
        <InvoicesPagination />
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
