'use client';

import { SearchBar } from '@/shared/components';
import DropdownMenu from '@/shared/components/DropdownMenu';
import FilterBottomSheet from '@/shared/components/modal/FilterBottomSheet';
import { Header } from '@/shared/layout';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const SORT_OPTIONS = ['후기 많은 순', '평점 높은 순'] as const;

const SupplementAddPage = () => {
  const [value, setValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [draftFilters, setDraftFilters] = useState({
    ageGroup: '전체',
    gender: undefined,
    certification: 'ALL',
    healthConcern: null,
  });

  const [sort, setSort] = useState('후기 많은 순');
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <main>
      <Header title='영양제 이름' />
      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>
      <div className='px-5 pb-4'>
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder='영양제를 검색해주세요.'
          onFilter={() => setIsFilterOpen(true)}
        />
      </div>

      <section className=' px-5 py-4'>
        <article className='flex items-center justify-between'>
          <p className='typo-body-5'>{value || '전체'} 제품 목록</p>

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
        </article>

        <article></article>
      </section>
    </main>
  );
};

export default SupplementAddPage;
