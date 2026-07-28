'use client';

import { FilterBottomSheet, SearchBar } from '@/shared/components';
import { useSupplementSearch, useSupplementFilters } from '@/features/cabinet/hooks';
import { useState } from 'react';

const SupplementSearchSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { keyword, setKeyword } = useSupplementSearch();
  const { filterGroups, resetFilters } = useSupplementFilters();

  return (
    <>
      <section className='px-5 pb-4'>
        <SearchBar
          value={keyword}
          onChange={setKeyword}
          placeholder='영양제를 검색해주세요.'
          onFilter={() => setIsFilterOpen(true)}
          className='h-12.5'
        />
      </section>
      <FilterBottomSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        groups={filterGroups}
        onReset={resetFilters}
        onApply={() => {
          setIsFilterOpen(false);
        }}
      />
    </>
  );
};

export default SupplementSearchSection;
