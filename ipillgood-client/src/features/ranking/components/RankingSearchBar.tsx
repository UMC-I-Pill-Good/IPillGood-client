'use client';

import { X } from 'lucide-react';
import SearchIcon from '@/assets/icons/fi-rr-search.svg';
import FilterIcon from '@/assets/icons/filter.svg';

interface RankingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFilterClick?: () => void;
  onSearch?: () => void;
}

const RankingSearchBar = ({
  value,
  onChange,
  onClear,
  onFilterClick,
  onSearch,
}: RankingSearchBarProps) => {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className='ranking-search-glass flex h-12 w-full items-center justify-between gap-0 rounded-2xl px-3 py-3 text-primary-600 backdrop-blur-none'>
      <button
        type='button'
        aria-label='검색 실행'
        className='inline-flex size-5 shrink-0 items-center justify-center'
        onClick={onSearch}
      >
        <SearchIcon aria-hidden='true' className='size-5' />
      </button>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='브랜드, 영양 성분을 검색해 보세요.'
        aria-label='브랜드, 영양 성분 검색'
        className='min-w-0 flex-1 bg-transparent px-1 typo-body-11 outline-none placeholder:text-neutral-800'
      />

      <div className='flex shrink-0 items-center gap-2'>
        {value.trim() && (
          <button
            type='button'
            aria-label='검색어 지우기'
            className='inline-flex size-6 items-center justify-center text-neutral-800'
            onClick={handleClear}
          >
            <X aria-hidden='true' className='size-6' />
          </button>
        )}
        <button
          type='button'
          aria-label='필터 열기'
          className='inline-flex size-[1.625rem] shrink-0 items-center justify-center text-primary-500'
          onClick={onFilterClick}
        >
          <FilterIcon aria-hidden='true' className='size-[1.625rem]' />
        </button>
      </div>
    </div>
  );
};

export default RankingSearchBar;
