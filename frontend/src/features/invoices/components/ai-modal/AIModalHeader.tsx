import { X, Sparkles } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const AIModalHeader = ({ onClose }: Props) => {
  return (
    <div className="flex items-center justify-between p-5 md:p-6 border-b border-(--color-border) shrink-0">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-(--color-primary-muted) flex items-center justify-center text-(--color-primary)">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-(--color-text-bright)">
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
  );
};
