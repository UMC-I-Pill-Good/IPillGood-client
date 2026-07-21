'use client';

import { SearchBar } from '@/shared/components';

interface RankingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  onSearch?: () => void;
}

const RankingSearchBar = ({ value, onChange, onFilterClick, onSearch }: RankingSearchBarProps) => {
  return (
    <div className='relative'>
      <SearchBar
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        onFilter={onFilterClick}
        placeholder='브랜드, 영양 성분을 검색해 보세요.'
        className='h-12 '
      />
      <button
        type='button'
        aria-label='검색 실행'
        className='absolute left-3 top-1/2 z-10 size-5 -translate-y-1/2'
        onClick={onSearch}
      />
    </div>
  );
};

export default RankingSearchBar;
