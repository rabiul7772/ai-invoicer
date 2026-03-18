import { DashboardLayout } from '../components/layout/DashboardLayout';
import { InvoicesHeader } from '../features/invoices/components/InvoicesHeader';
import { InvoicesSearch } from '../features/invoices/components/InvoicesSearch';
import { InvoicesFilters } from '../features/invoices/components/InvoicesFilters';
import { InvoicesTable } from '../features/invoices/components/InvoicesTable';

const Invoices = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-4">
        <InvoicesHeader />
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <InvoicesSearch />
          </div>
          <div>
            <InvoicesFilters />
          </div>
        </div>
        <InvoicesTable />
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
