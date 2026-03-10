import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Generate page numbers, showing at most 5 pills
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          'ellipsis',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="ghost"
        className="w-10 h-10 p-0 border border-[rgba(255,255,255,0.05)] text-(--color-text-dim) hover:text-(--color-text-bright)"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {getPageNumbers().map((page, idx) =>
        page === 'ellipsis' ? (
          <div
            key={`ellipsis-${idx}`}
            className="w-10 h-10 flex items-center justify-center text-(--color-text-dim)"
          >
            <MoreHorizontal className="w-4 h-4" />
          </div>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'neon' : 'ghost'}
            className={`w-10 h-10 p-0 font-medium border ${
              currentPage === page
                ? 'border-(--color-primary)'
                : 'border-[rgba(255,255,255,0.05)] text-(--color-text-dim) hover:text-(--color-text-bright)'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        className="w-10 h-10 p-0 border border-[rgba(255,255,255,0.05)] text-(--color-text-dim) hover:text-(--color-text-bright)"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
