'use client';

import { FilterIcon } from '@/assets';
import { SearchBar } from '@/shared/components';

interface RankingSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick?: () => void;
  onSearch?: () => void;
}

const RankingSearchBar = ({
  value,
  onChange,
  onFilterClick,
  onSearch,
}: RankingSearchBarProps) => {
  return (
    <div className='relative'>
      <SearchBar
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder='브랜드, 영양 성분을 검색해 보세요.'
        className='h-12 w-full rounded-2xl bg-white px-3 py-3 text-primary-600 shadow-none backdrop-blur-none'
        inputClassName='min-w-0 px-1 typo-body-11 placeholder:text-neutral-800'
        searchIconClassName='size-5'
        searchIconSize={20}
        rightElement={
          !value.trim() ? (
            <button
              type='button'
              aria-label='필터 열기'
              className='inline-flex size-5 shrink-0 items-center justify-center self-center text-primary-500'
              onClick={onFilterClick}
            >
              <FilterIcon aria-hidden='true' className='block size-5' />
            </button>
          ) : undefined
        }
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
