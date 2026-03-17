import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router';

export const InvoicesSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (term: string) => {
    const value = term.trim();

    setSearchParams(
      prev => {
        const newParams = new URLSearchParams(prev);
        if (value) {
          newParams.set('search', value);
          newParams.set('page', '1');
        } else {
          newParams.delete('search');
        }
        return newParams;
      },
      { replace: true }
    );
  };

  return (
    <div className="card-premium p-2 flex gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--color-text-dim)" />
        <input
          type="text"
          defaultValue={searchParams.get('search') || ''}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search invoices with clients name & email..."
          className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg py-1.5 pl-9 pr-4 text-xs text-(--color-text-bright) placeholder:text-(--color-text-dim) focus:outline-hidden focus:border-(--color-primary) transition-colors"
        />
      </div>
    </div>
  );
};
