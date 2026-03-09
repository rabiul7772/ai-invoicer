import { X, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { ModalPortal } from '../../../components/ui/ModalPortal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWithAIModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-(--color-border) shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-(--color-primary-muted) flex items-center justify-center text-(--color-primary)">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-(--color-text-bright)">
                Create Invoice with AI
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            <p className="text-(--color-text-dim) leading-relaxed">
              Paste any unstructured text that contains invoice details (like
              client name, items, quantities, and prices) and the AI will
              attempt to create an invoice from it.
            </p>

            <div className="space-y-3">
              <label className="text-sm font-bold text-(--color-text-bright) uppercase tracking-wider">
                Paste Invoice Text Here
              </label>
              <textarea
                placeholder="Ex: Bill to John Doe, 123 Main St. Items: Logo Design $500 x 1, Website Dev $1500 x 1..."
                className="w-full h-64 bg-(--color-bg-accent) border border-(--color-border) rounded-xl p-4 text-(--color-text-bright) placeholder:text-(--color-text-muted) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all resize-none custom-scrollbar"
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button
                variant="ghost"
                type="button"
                onClick={onClose}
                className="flex-1 border border-(--color-border)"
              >
                Cancel
              </Button>
              <Button
                variant="neon"
                icon={Wand2}
                className="flex-1"
                onClick={() => {}}
              >
                Generate Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
