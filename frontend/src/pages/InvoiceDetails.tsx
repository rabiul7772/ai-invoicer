import { ChevronLeft, Download, Loader2, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { SendInvoiceModal } from '../features/invoices/components/SendInvoiceModal';
import { useInvoiceDetails } from '../features/invoices/hooks/useInvoiceDetails';
import { downloadPdf } from '../utils/downloadPdf';

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const { invoice, pdfUrl, isLoading, isGeneratingPdf, isError } =
    useInvoiceDetails(id);

  const handleDownload = () => {
    if (!pdfUrl || !invoice) return;
    downloadPdf(pdfUrl, `invoice-${invoice.billTo.clientName || 'draft'}.pdf`);
  };

  if (isLoading)
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );

  if (isError || !invoice) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-(--color-text-dim) font-medium text-lg">
            Invoice not found or failed to load.
          </p>
          <Button onClick={() => navigate('/invoices')}>
            Back to Invoices
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/invoices')}
              className="p-2 text-(--color-text-dim) hover:text-(--color-text-bright) hover:bg-white/5 rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-black text-(--color-text-bright) tracking-tight">
                Invoice Details
              </h1>
              <p className="text-(--color-text-dim) text-sm mt-1">
                Viewing invoice for {invoice.billTo.clientName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              icon={Download}
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="border border-(--color-border)"
            >
              Download
            </Button>
            {invoice.status !== 'PAID' && (
              <Button
                variant="neon"
                icon={Mail}
                onClick={() => setIsSendModalOpen(true)}
                disabled={!invoice}
              >
                {invoice.status === 'DRAFT' ? 'Send' : 'Send reminder'}
              </Button>
            )}
          </div>
        </div>

        {/* PDF Preview Container */}
        <div className="bg-(--color-bg-card) border border-(--color-border) rounded-2xl overflow-hidden shadow-2xl h-[800px] flex flex-col relative">
          {isGeneratingPdf && (
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-32 sm:items-center sm:pt-0">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-(--color-primary) animate-spin" />
                <p className="text-white font-medium">Rendering PDF...</p>
              </div>
            </div>
          )}

          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-none"
              title="Invoice Preview"
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Preview not available</p>
            </div>
          )}
        </div>
      </div>

      <SendInvoiceModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onSuccess={() => navigate('/invoices')}
        invoiceId={id || ''}
        status={invoice.status}
        defaultData={{
          clientName: invoice.billTo.clientName,
          clientEmail: invoice.billTo.clientEmail,
          businessName: invoice.billFrom.businessName
        }}
      />
    </DashboardLayout>
  );
};

export default InvoiceDetails;
