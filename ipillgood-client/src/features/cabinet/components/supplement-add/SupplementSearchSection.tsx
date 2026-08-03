'use client';

import { DropdownMenu, SearchBar } from '@/shared/components';
import { useAtom } from 'jotai';
import { productKeywordAtom } from '@/features/cabinet/atoms/cabinet.atom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const SORT_OPTIONS = ['후기 많은 순', '평점 높은 순'] as const;

const SupplementSearchSection = () => {
  const [keyword, setKeyword] = useAtom(productKeywordAtom);

  const [sort, setSort] = useState<'후기 많은 순' | '평점 높은 순'>('후기 많은 순');
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <section className='flex flex-col px-5 space-y-8'>
      <SearchBar
        value={keyword}
        onChange={setKeyword}
        placeholder='영양제를 검색해주세요.'
        isFilterButton={false}
        isClearButton={true}
        className='h-12'
      />

      <section className='flex items-center justify-between'>
        <p className='typo-body-5'>{keyword || '전체'} 제품 목록</p>

        <div className='relative'>
          <button
            type='button'
            aria-label='정렬 방식'
            onClick={() => setIsSortOpen((prev) => !prev)}
            className='flex h-8 items-center glass text-neutral typo-caption-2'
          >
            {sort}
            <ChevronDown className={clsx(' transition-transform', isSortOpen && 'rotate-180')} />
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
