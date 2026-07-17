'use client';

import { SlidersHorizontal } from 'lucide-react';
import { SearchBar } from '@/shared/components';

interface RankingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
}

const RankingSearchBar = ({
  value,
  onChange,
  onFilterClick,
}: RankingSearchBarProps) => {
  return (
    <SearchBar
      value={value}
      onChange={onChange}
      placeholder='브랜드, 영양 성분을 검색해 보세요.'
      className='ranking-search-glass gap-0 rounded-2xl text-primary-600 backdrop-blur-none'
      inputClassName='min-w-0 px-1 typo-body-11 placeholder:text-neutral-800'
      searchIconClassName='size-5'
      searchIconSize={20}
      rightElement={
        <button
          type='button'
          aria-label='필터 열기'
          className='inline-flex size-7 shrink-0 items-center justify-center text-primary-500'
          onClick={onFilterClick}
        >
          <SlidersHorizontal aria-hidden='true' className='size-6' />
        </button>
      }
    />
  );
};

export default RankingSearchBar;
