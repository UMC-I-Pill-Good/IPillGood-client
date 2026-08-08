'use client';

import { useState } from 'react';

import { AdminSearchBar } from '@/shared/components';

import type { FaqCategoryType } from '../constants/FaqCategory';
import FaqCategoryFilter from './FaqCategoryFilter';

const FaqSearchFilterSection = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType>('전체');

  return (
    <section aria-label='FAQ 검색 및 필터' className='flex items-center gap-4 px-10 pb-4 pt-8'>
      <div className='min-w-0 basis-[551px]'>
        <AdminSearchBar value={searchValue} onChange={setSearchValue} placeholder='제목으로 검색' />
      </div>
      <FaqCategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
    </section>
  );
};

export default FaqSearchFilterSection;
