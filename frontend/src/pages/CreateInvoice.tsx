import { DashboardLayout } from '../components/layout/DashboardLayout';
import { InvoiceForm } from '../features/invoices/components/InvoiceForm';

const CreateEditInvoice = () => {
  return (
    <DashboardLayout>
      <InvoiceForm />
    </DashboardLayout>
  );
};

export default CreateEditInvoice;
