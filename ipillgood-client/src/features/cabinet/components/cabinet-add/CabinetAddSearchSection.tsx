'use client';

import { DropdownMenu, SearchBar } from '@/shared/components';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useDebounce } from '@/shared/hooks/useDebounce';

const SORT_OPTIONS = ['후기 많은 순', '평점 높은 순'] as const;

interface CabinetAddSearchSectionProps {
  onDebouncedKeywordChange: (keyword: string | null) => void;
  sort: '후기 많은 순' | '평점 높은 순';
  setSort: (value: '후기 많은 순' | '평점 높은 순') => void;
}

const CabinetAddSearchSection = ({
  onDebouncedKeywordChange,
  sort,
  setSort,
}: CabinetAddSearchSectionProps) => {
  const [keyword, setKeyword] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    onDebouncedKeywordChange(debouncedKeyword || null);
  }, [debouncedKeyword, onDebouncedKeywordChange]);

  return (
    <section className='flex flex-col px-5 space-y-9 pb-2'>
      <SearchBar
        value={keyword}
        onChange={setKeyword}
        placeholder='영양제를 검색해주세요.'
        isFilterButton={false}
        isClearButton
        className='h-12'
      />

      <section className='flex items-center justify-between'>
        <p className='typo-body-5'>제품 목록</p>

        <div className='relative'>
          <button
            type='button'
            aria-label='정렬 방식'
            onClick={() => setIsSortOpen((prev) => !prev)}
            className='flex h-8 items-center glass text-neutral typo-caption-2'
          >
            {sort}
            <ChevronDown className={clsx('transition-transform', isSortOpen && 'rotate-180')} />
          </button>

          {isSortOpen && (
            <DropdownMenu
              options={[...SORT_OPTIONS]}
              value={sort}
              onSelect={(value) => {
                setSort(value);
                setIsSortOpen(false);
              }}
              onClose={() => setIsSortOpen(false)}
              buttonClassName='typo-caption-2'
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default CabinetAddSearchSection;
