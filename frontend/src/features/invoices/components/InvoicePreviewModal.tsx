import { X, Download } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  clientName: string;
}

export const InvoicePreviewModal = ({
  isOpen,
  onClose,
  pdfUrl,
  clientName
}: Props) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = `invoice-${clientName || 'draft'}.pdf`.replace(/\s+/g, '-');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-[rgba(20,20,20,0.95)] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)]">
          <h2 className="text-xl font-bold text-(--color-text-bright)">
            Invoice Preview
          </h2>
          <div className="flex items-center gap-4">
            <Button
              variant="neon"
              icon={Download}
              onClick={handleDownload}
              disabled={!pdfUrl}
            >
              Download PDF
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center relative">
          {pdfUrl ? (
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full border-none"
              title="PDF Preview"
            />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
              <p>Generating PDF format on server...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
