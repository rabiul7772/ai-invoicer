import { useState } from 'react';
import { ListFilter, ChevronDown, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { STATUS_OPTIONS } from '../../../constants';

export const InvoicesFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get('status') || '';
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption =
    STATUS_OPTIONS.find(opt => opt.value === currentStatus) ||
    STATUS_OPTIONS[0];

  const handleSelect = (value: string) => {
    setSearchParams(
      prev => {
        const p = new URLSearchParams(prev);
        value ? p.set('status', value) : p.delete('status');
        p.set('page', '1');
        return p;
      },
      { replace: true }
    );
    setIsOpen(false);
  };

  return (
    <div className="card-premium p-2 flex flex-col md:flex-row gap-2 mb-4">
      {/* Status Filter Dropdown */}
      <div className="relative min-w-[140px]">
        <div
          className="flex items-center justify-between bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-lg py-1.5 px-3 cursor-pointer hover:border-(--color-primary) transition-colors group relative z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <ListFilter className="w-3.5 h-3.5 text-(--color-text-dim) group-hover:text-(--color-primary) transition-colors" />
            <span className="text-xs text-(--color-text-bright) font-medium">
              {selectedOption.label}
            </span>
          </div>
          <ChevronDown
            className={`w-3 h-3 text-(--color-text-dim) transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-[#0b1a13] border border-[rgba(0,255,136,0.2)] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden">
              {STATUS_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer hover:bg-[rgba(0,255,136,0.1)] transition-colors ${
                    option.value === currentStatus
                      ? 'text-(--color-primary) font-bold bg-[rgba(0,255,136,0.05)]'
                      : 'text-(--color-text-bright)'
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {option.value === currentStatus && (
                    <Check className="w-3 h-3 text-(--color-primary)" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
