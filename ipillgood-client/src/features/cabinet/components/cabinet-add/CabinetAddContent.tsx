'use client';

import CabinetAddSearchSection from './CabinetAddSearchSection';
import CabinetAddList from './CabinetAddList';
import CabinetAddSection from './CabinetAddSection';
import { MascotSadIcon } from '@/assets';
import { useCabinetSearchQuery, useSupplementSelection } from '@/features/cabinet/hooks';

const CabinetAddContent = () => {
  const { selectedIds, toggle } = useSupplementSelection();

  const {
    setDebouncedKeyword,
    sort,
    setSort,
    products,
    isEmptySearchResult,
    hasNextPage,
    loadMoreRef,
  } = useCabinetSearchQuery();

  return (
    <section className='flex min-h-0 flex-1 flex-col'>
      <CabinetAddSearchSection
        onDebouncedKeywordChange={setDebouncedKeyword}
        sort={sort}
        setSort={setSort}
      />

      <div className='thin-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain'>
        {isEmptySearchResult ? (
          <section className='flex flex-col items-center px-5 pt-20 text-center'>
            <MascotSadIcon />
            <p className='mt-4 typo-body-6 text-primary-700'>검색 결과가 존재하지 않아요...</p>
          </section>
        ) : (
          <CabinetAddList products={products} selectedIds={selectedIds} onToggle={toggle} />
        )}

        {hasNextPage && <div ref={loadMoreRef} className='h-px w-full' />}
      </div>

      {!isEmptySearchResult && <CabinetAddSection selectedIds={selectedIds} />}
    </section>
  );
};

export default CabinetAddContent;
