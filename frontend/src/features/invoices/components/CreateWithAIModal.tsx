import { Copy, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ModalPortal } from '../../../components/ui/ModalPortal';
import type { ExtractedInvoiceData } from '../api/extractInvoiceData';
import { useAiSampleText } from '../hooks/useAiSampleText';
import { useExtractInvoiceData } from '../hooks/useExtractInvoiceData';
import { AIModalFooter } from './ai-modal/AIModalFooter';
import { AIModalHeader } from './ai-modal/AIModalHeader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDataExtracted: (data: ExtractedInvoiceData) => void;
}

export const CreateWithAIModal = ({
  isOpen,
  onClose,
  onDataExtracted
}: Props) => {
  const [text, setText] = useState('');
  const { extractData, isExtracting } = useExtractInvoiceData();
  const { generateAndCopy, isGenerating } = useAiSampleText();

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!text.trim()) return;
    extractData(text, {
      onSuccess: data => {
        onDataExtracted(data);
        onClose();
        setText('');
      }
    });
  };

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-xl bg-(--color-bg-card) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          <AIModalHeader onClose={onClose} />

          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold tracking-wider">
                AI generated random invoice text (for testing)
              </label>
              <button
                onClick={() => generateAndCopy()}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-(--color-primary-muted) text-(--color-primary) text-xs font-bold border border-(--color-primary)/20 hover:bg-(--color-primary)/20 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                Get Smart Sample
              </button>
            </div>

            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Ex: Bill to John Doe, 123 Main St. Items: Logo Design $500 x 1, Website Dev $1500 x 1..."
              className="w-full h-64 bg-(--color-bg-accent) border border-(--color-border) rounded-xl p-4 text-(--color-text-bright) placeholder:text-(--color-text-muted) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all resize-none custom-scrollbar"
              disabled={isExtracting}
            />

            <AIModalFooter
              onClose={onClose}
              onGenerate={handleGenerate}
              isExtracting={isExtracting}
              canGenerate={text.trim().length > 0}
            />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
