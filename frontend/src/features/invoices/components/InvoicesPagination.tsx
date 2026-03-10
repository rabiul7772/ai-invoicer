import { INVOICE_PER_PAGE } from '../../../constants';

interface PaginationProps {
  currentPage: number;
  pageSize?: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export const InvoicesPagination = ({
  currentPage,
  pageSize = INVOICE_PER_PAGE,
  totalCount,
  onPageChange
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between p-4 border-t border-[rgba(255,255,255,0.05)] text-sm">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-(--color-text-dim) hover:text-(--color-primary) font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="text-lg leading-none">&larr;</span> Previous
      </button>

      <span className="text-(--color-text-dim) font-medium">
        Showing{' '}
        <span className="font-bold text-(--color-text-bright)">
          {startResult}
        </span>{' '}
        to{' '}
        <span className="font-bold text-(--color-text-bright)">
          {endResult}
        </span>{' '}
        of{' '}
        <span className="font-bold text-(--color-text-bright)">
          {totalCount}
        </span>{' '}
        results
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-(--color-text-dim) hover:text-(--color-primary) font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next <span className="text-lg leading-none">&rarr;</span>
      </button>
    </div>
  );
};
