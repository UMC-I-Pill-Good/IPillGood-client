'use client';

import { AdminPaginationChevronIcon } from '@/assets';
import { cn } from '@/shared/utils';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageGroupSize?: number;
  className?: string;
}

const AdminPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageGroupSize = 5,
  className,
}: AdminPaginationProps) => {
  const normalizedTotalPages = Math.max(0, Math.floor(totalPages));
  const normalizedPageGroupSize = Math.max(1, Math.floor(pageGroupSize));
  const normalizedCurrentPage = Math.min(
    Math.max(1, Math.floor(currentPage)),
    Math.max(1, normalizedTotalPages),
  );
  const currentGroupIndex = Math.floor((normalizedCurrentPage - 1) / normalizedPageGroupSize);
  const startPage = currentGroupIndex * normalizedPageGroupSize + 1;
  const endPage = Math.min(startPage + normalizedPageGroupSize - 1, normalizedTotalPages);
  const visiblePageList = Array.from(
    { length: Math.max(0, endPage - startPage + 1) },
    (_, index) => startPage + index,
  );
  const hasPreviousGroup = startPage > 1;
  const hasNextGroup = endPage < normalizedTotalPages;

  const handlePreviousGroupClick = () => {
    if (!hasPreviousGroup) {
      return;
    }

    onPageChange(startPage - 1);
  };

  const handleNextGroupClick = () => {
    if (!hasNextGroup) {
      return;
    }

    onPageChange(endPage + 1);
  };

  if (!normalizedTotalPages) {
    return null;
  }

  return (
    <nav
      aria-label='페이지 탐색'
      className={cn('flex items-center justify-center gap-4', className)}
    >
      <button
        type='button'
        onClick={handlePreviousGroupClick}
        disabled={!hasPreviousGroup}
        aria-label='이전 페이지 묶음'
        className='flex h-5 w-[15px] shrink-0 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40'
      >
        <AdminPaginationChevronIcon className='h-[11px] w-1.5' aria-hidden='true' />
      </button>

      <ol className='flex items-center justify-center gap-2'>
        {visiblePageList.map((page) => {
          const isCurrentPage = page === normalizedCurrentPage;

          return (
            <li key={page}>
              <button
                type='button'
                onClick={() => onPageChange(page)}
                aria-label={`${page}페이지`}
                aria-current={isCurrentPage ? 'page' : undefined}
                className={cn(
                  'text-xl font-medium leading-none',
                  isCurrentPage ? 'text-black' : 'text-neutral',
                )}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type='button'
        onClick={handleNextGroupClick}
        disabled={!hasNextGroup}
        aria-label='다음 페이지 묶음'
        className='flex h-5 w-[15px] shrink-0 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40'
      >
        <AdminPaginationChevronIcon className='h-[11px] w-1.5 rotate-180' aria-hidden='true' />
      </button>
    </nav>
  );
};

export default AdminPagination;
