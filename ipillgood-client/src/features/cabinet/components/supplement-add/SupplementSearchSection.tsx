'use client';

import { DropdownMenu, SearchBar } from '@/shared/components';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const SORT_OPTIONS = ['후기 많은 순', '평점 높은 순'] as const;

interface SupplementSearchSectionProps {
  keyword: string;
  setKeyword: (value: string) => void;
  sort: '후기 많은 순' | '평점 높은 순';
  setSort: (value: '후기 많은 순' | '평점 높은 순') => void;
}

const SupplementSearchSection = ({
  keyword,
  setKeyword,
  sort,
  setSort,
}: SupplementSearchSectionProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <section className='flex flex-col px-5 space-y-9'>
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

export default SupplementSearchSection;
