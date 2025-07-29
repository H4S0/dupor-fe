import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TablePaginationProps = {
  onPageChange: (pageNum: number) => void;
  pageRange: (number | string)[];
  currentPage: number | undefined;
  totalPage: number | undefined;
};

const TablePagination = ({
  onPageChange,
  pageRange,
  currentPage,
  totalPage,
}: TablePaginationProps) => {
  if (!currentPage) {
    return <p>There are no users at all</p>;
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md  disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pageRange.map((pageNum, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNum === 'number' ? onPageChange(pageNum) : null
          }
          disabled={pageNum === '...'}
          className={cn(
            'h-8 min-w-8 rounded-md flex items-center justify-center px-3',
            {
              'bg-primary text-white': pageNum === currentPage,
              'text-gray-400 cursor-not-allowed': pageNum === '...',
            }
          )}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TablePagination;
