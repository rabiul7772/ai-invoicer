import { DashboardLayout } from '../components/layout/DashboardLayout';
import { InvoiceForm } from '../features/invoices/components/InvoiceForm';

const CreateInvoice = () => {
  return (
    <DashboardLayout>
      <InvoiceForm />
    </DashboardLayout>
  );
};

export default CreateInvoice;
