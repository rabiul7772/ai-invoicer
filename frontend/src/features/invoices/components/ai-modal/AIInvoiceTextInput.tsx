import { Copy, Loader2 } from 'lucide-react';

interface Props {
  text: string;
  onChange: (value: string) => void;
  isGenerating: boolean;
  isExtracting: boolean;
  onGenerateSample: () => void;
}

export const AIInvoiceTextInput = ({
  text,
  onChange,
  isGenerating,
  isExtracting,
  onGenerateSample
}: Props) => {
  return (
    <div className="space-y-6 flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-wider">
          AI generated random invoice text (for testing)
        </label>
        <button
          onClick={onGenerateSample}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-(--color-primary-muted) text-(--color-primary) text-[10px] md:text-xs font-bold border border-(--color-primary)/20 hover:bg-(--color-primary)/20 transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span className="hidden md:inline">Get Smart Sample</span>
          <span className="md:hidden">Generate</span>
        </button>
      </div>

      <textarea
        value={text}
        onChange={e => onChange(e.target.value)}
        placeholder="Ex: Bill to John Doe, 123 Main St. Items: Logo Design $500 x 1, Website Dev $1500 x 1..."
        className="w-full flex-1 bg-(--color-bg-accent) border border-(--color-border) rounded-xl p-3 md:p-4 text-sm md:text-base text-(--color-text-bright) placeholder:text-(--color-text-muted) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent outline-none transition-all resize-none custom-scrollbar"
        disabled={isExtracting}
      />
    </div>
  );
};
