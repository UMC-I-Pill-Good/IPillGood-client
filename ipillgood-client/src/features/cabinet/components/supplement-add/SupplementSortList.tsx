'use client';

import { useSupplementSearch, useSupplementSelection } from '@/features/cabinet/hooks';
import DropdownMenu from '@/shared/components/DropdownMenu';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { SORT_OPTIONS } from '@/features/cabinet/constants/supplementFilter.constants';
import { supplementList } from '@/features/cabinet/mocks/supplement.mocks';
import SupplementCard from './SupplementCard';

const SupplementSortList = () => {
  const { keyword } = useSupplementSearch();
  const { selectedIds, toggle } = useSupplementSelection();

  const [sort, setSort] = useState('후기 많은 순');
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <section className=' px-5 py-4'>
      <article className='flex items-center justify-between'>
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
      </article>

      <article className='mt-2 space-y-2'>
        {supplementList.map((item) => (
          <SupplementCard
            key={item.id}
            item={item}
            checked={selectedIds.includes(item.id)}
            onCheck={() => toggle(item.id)}
          />
        ))}
      </article>
    </section>
  );
};

export default SupplementSortList;
