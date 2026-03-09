import { Search, ListFilter, ChevronDown } from 'lucide-react';

export const InvoicesFilters = () => {
  return (
    <div className="card-premium p-2 flex flex-col md:flex-row gap-2 mb-4">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-dim)" />
        <input
          type="text"
          placeholder="Search invoices, clients, or tags..."
          className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg py-1.5 pl-9 pr-4 text-xs text-(--color-text-bright) placeholder:text-(--color-text-dim) focus:outline-hidden focus:border-(--color-primary) transition-colors"
        />
      </div>

      {/* Status Filter */}
      <div className="relative min-w-[140px]">
        <div className="flex items-center justify-between bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg py-1.5 px-3 cursor-pointer hover:border-(--color-primary) transition-colors group">
          <div className="flex items-center gap-2">
            <ListFilter className="w-3.5 h-3.5 text-(--color-text-dim) group-hover:text-(--color-primary)" />
            <span className="text-xs text-(--color-text-bright)">
              All Status
            </span>
          </div>
          <ChevronDown className="w-3 h-3 text-(--color-text-dim)" />
        </div>
      </div>
    </div>
  );
};
