import { useState } from 'react';
import toast from 'react-hot-toast';
import { FormProvider } from 'react-hook-form';
import { Building2, User2 } from 'lucide-react';
import { useInvoiceForm } from '../hooks/useInvoiceForm';
import { useSubmitInvoice } from '../hooks/useSubmitInvoice';
import { BillSection } from './BillSection';
import { ItemsTable } from './ItemsTable';
import { NotesSection } from './NotesSection';
import { InvoicePreviewModal } from './InvoicePreviewModal';
import { InvoiceFormHeader } from './InvoiceFormHeader';
import { InvoiceFormActions } from './InvoiceFormActions';
import { generatePdf } from '../api/generatePdfApi';
import { billFromFields, billToFields } from '../../../constants';

export const InvoiceForm = () => {
  const { methods, fields, append, remove, totals, isEditing, id, isLoading } =
    useInvoiceForm();
  const { onSubmit, isSubmitting } = useSubmitInvoice(methods, id);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePreviewPdf = async () => {
    const isValid = await methods.trigger();
    if (!isValid) {
      toast.error('Please fill the required fields before previewing.');
      return;
    }
    setIsPreviewOpen(true);
    setIsGeneratingPdf(true);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    try {
      const result = await generatePdf(methods.getValues());
      if (result.success && result.url) setPdfUrl(result.url);
      else {
        toast.error(result.message || 'Failed to generate PDF');
        setIsPreviewOpen(false);
      }
    } catch (error) {
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
        <div
          className={`flex-1 space-y-12 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          <InvoiceFormHeader isEditing={isEditing} />

          <div className="h-px bg-[rgba(255,255,255,0.05)]" />

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
          <ItemsTable fields={fields} append={append} remove={remove} />
          <NotesSection totals={totals} />
          <InvoiceFormActions
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            isGeneratingPdf={isGeneratingPdf}
            onPreview={handlePreviewPdf}
          />
        </div>
      </form>

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
