import { ChevronLeft, ChevronRight } from 'lucide-react';

export const InvoicesPagination = () => {
  return (
    <div className="flex items-center justify-between mt-6 px-2">
      <p className="text-sm text-(--color-text-dim)">
        Showing{' '}
        <span className="text-(--color-text-bright) font-medium">1</span> to{' '}
        <span className="text-(--color-text-bright) font-medium">4</span> of{' '}
        <span className="text-(--color-text-bright) font-medium">24</span>{' '}
        invoices
      </p>

      <div className="flex items-center gap-2">
        <button className="p-2 text-(--color-text-dim) hover:text-(--color-primary) transition-colors border border-transparent hover:border-[rgba(0,255,136,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.02)]">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-(--color-primary) text-[#0a1d14] font-black text-sm">
          1
        </button>

        {[2, 3].map(page => (
          <button
            key={page}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-(--color-text-dim) hover:text-(--color-text-bright) hover:bg-[rgba(255,255,255,0.03)] border border-transparent hover:border-[rgba(255,255,255,0.05)] transition-all text-sm font-bold"
          >
            {page}
          </button>
        ))}

        <button className="p-2 text-(--color-text-dim) hover:text-(--color-primary) transition-colors border border-transparent hover:border-[rgba(0,255,136,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.02)]">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
