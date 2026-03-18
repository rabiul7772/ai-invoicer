import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { ModalPortal } from '../../../components/ui/ModalPortal';
import type { ExtractedInvoiceData } from '../api/extractInvoiceData';
import { useAiSampleText } from '../hooks/useAiSampleText';
import { useExtractInvoiceData } from '../hooks/useExtractInvoiceData';
import { AIModalFooter } from './ai-modal/AIModalFooter';
import { AIModalHeader } from './ai-modal/AIModalHeader';
import { useProfileQuery } from '../../profile/hooks/useProfile';
import { AIProfileRequired } from './ai-modal/AIProfileRequired';
import { AIInvoiceTextInput } from './ai-modal/AIInvoiceTextInput';

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
  const { data: profileData, isPending: isProfileLoading } = useProfileQuery();

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
          className="relative w-[95vw] max-w-xl bg-(--color-bg-card) border border-(--color-border) rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          <AIModalHeader onClose={onClose} />

          <div className="p-5 md:p-8 flex flex-col min-h-[350px] md:min-h-[400px]">
            {isProfileLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-(--color-text-dim)">
                <Loader2 className="w-8 h-8 animate-spin text-(--color-primary)" />
                <p>Checking business info...</p>
              </div>
            ) : !profileData?.businessName ? (
              <AIProfileRequired onClose={onClose} />
            ) : (
              <div className="space-y-6 flex-1 flex flex-col overflow-hidden">
                <AIInvoiceTextInput
                  text={text}
                  onChange={setText}
                  isGenerating={isGenerating}
                  isExtracting={isExtracting}
                  onGenerateSample={() => generateAndCopy()}
                />

                <AIModalFooter
                  onClose={onClose}
                  onGenerate={handleGenerate}
                  isExtracting={isExtracting}
                  canGenerate={text.trim().length > 0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
