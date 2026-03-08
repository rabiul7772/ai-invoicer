import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider } from 'react-hook-form';
import { Building2, User2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useInvoiceForm } from '../hooks/useInvoiceForm';
import { useSubmitInvoice } from '../hooks/useSubmitInvoice';
import { BillSection } from './BillSection';
import { ItemsTable } from './ItemsTable';
import { NotesSection } from './NotesSection';
import { InvoicePreviewModal } from './InvoicePreviewModal';
import { generatePdf } from '../api/generatePdfApi';
import { billFromFields, billToFields } from '../../../constants';

export const InvoiceForm = () => {
  const { methods, fields, append, remove, totals } = useInvoiceForm();
  const { onSubmit, isSubmitting } = useSubmitInvoice(methods);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePreviewPdf = async () => {
    // 1. Trigger validation for the entire form
    const isValid = await methods.trigger();

    if (!isValid) {
      toast.error('Please fill the required fields before previewing.');
      return;
    }

    setIsPreviewOpen(true);
    setIsGeneratingPdf(true);

    // Clear old blob url to free memory and reset iframe loading state
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    try {
      const result = await generatePdf(methods.getValues());
      if (result.success && result.url) {
        setPdfUrl(result.url);
      } else {
        toast.error(result.message || 'Failed to generate PDF');
        setIsPreviewOpen(false); // Close if generation fails before loading
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while generating the PDF.');
      setIsPreviewOpen(false);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative flex gap-12"
      >
        <div className="flex-1 space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-black text-(--color-text-bright) tracking-tight">
                Create Invoice
              </h1>
              <p className="text-(--color-text-dim) mt-2">
                Fill in the details below to generate a professional invoice.
              </p>
            </div>

            <Button
              variant="ghost"
              type="button"
              className="border border-(--color-primary)"
              onClick={() => methods.reset()} // Handle discard
            >
              Discard
            </Button>
          </div>

          <div className="h-px bg-[rgba(255,255,255,0.05)]" />

          {/* Bill Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <BillSection
              title="Bill From"
              icon={Building2}
              prefix="billFrom"
              fields={billFromFields}
            />
            <BillSection
              title="Bill To"
              icon={User2}
              prefix="billTo"
              fields={billToFields}
            />
          </div>

          <div className="h-px bg-[rgba(255,255,255,0.05)]" />

          {/* Items Section */}
          <ItemsTable fields={fields} append={append} remove={remove} />

          {/* Notes & Calculations */}
          <NotesSection totals={totals} />

          {/* Bottom Actions */}
          <div className="flex justify-end gap-6 pt-12 border-t border-[rgba(255,255,255,0.05)]">
            <Button
              variant="ghost"
              type="button"
              className="border border-(--color-primary)"
              onClick={() => methods.reset()} // Handle discard
            >
              Discard
            </Button>
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={handlePreviewPdf}
              isLoading={isGeneratingPdf}
            >
              Preview PDF
            </Button>
            <Button
              type="submit"
              variant="neon"
              size="md"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Generate Invoice
            </Button>
          </div>
        </div>
      </form>

      {/* PDF Generation Modal */}
      <InvoicePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          if (pdfUrl) URL.revokeObjectURL(pdfUrl);
          setPdfUrl(null);
        }}
        pdfUrl={pdfUrl}
        clientName={methods.getValues().billTo.clientName}
      />
    </FormProvider>
  );
};
