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
      rightElement={
        <button
          type='button'
          aria-label='필터 열기'
          className='inline-flex size-[26px] shrink-0 items-center justify-center text-primary-500'
          onClick={onFilterClick}
        >
          <SlidersHorizontal size={26} aria-hidden='true' strokeWidth={2} />
        </button>
      }
    />
  );
};

export default RankingSearchBar;
