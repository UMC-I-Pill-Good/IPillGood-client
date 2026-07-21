'use client';

import { X } from 'lucide-react';
import { SearchBar } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

interface RankingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  onSearch?: () => void;
  className?: string;
  searchBarClassName?: string;
  showFilterButton?: boolean;
}

const RankingSearchBar = ({
  value,
  onChange,
  onFilterClick,
  onSearch,
  className,
  searchBarClassName,
  showFilterButton,
}: RankingSearchBarProps) => {
  const hasValue = Boolean(value.trim());
  const shouldShowFilterButton = showFilterButton ?? !hasValue;

  return (
    <div className={cn('relative', className)}>
      <SearchBar
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onFilter={onFilterClick}
        placeholder='브랜드, 영양 성분을 검색해 보세요.'
        className={cn(
          'h-12 w-full rounded-2xl bg-white px-3 py-3 text-primary-600 shadow-none backdrop-blur-none [&>button]:flex [&>button]:size-[1.625rem] [&>button]:translate-x-1 [&>button]:translate-y-1 [&>button]:shrink-0 [&>button]:items-center [&>button]:justify-center [&>button]:text-primary-500 [&>button>svg]:block [&>button>svg]:size-[1.625rem]',
          searchBarClassName,
        )}
        inputClassName={cn(
          'min-w-0 px-1 typo-body-11 placeholder:text-neutral-800',
          !shouldShowFilterButton && 'pr-9',
        )}
        isFilterButton={shouldShowFilterButton}
      />
      <button
        type='button'
        aria-label='검색 실행'
        className='absolute left-3 top-1/2 z-10 size-5 -translate-y-1/2'
        onClick={onSearch}
      />
      {!shouldShowFilterButton && (
        <button
          type='button'
          aria-label='검색어 지우기'
          className='absolute right-3 top-1/2 z-10 flex size-6 -translate-y-1/2 items-center justify-center text-neutral-800'
          onClick={() => onChange('')}
        >
          <X aria-hidden='true' className='size-6' />
        </button>
      )}
    </div>
  );
};

export default RankingSearchBar;
