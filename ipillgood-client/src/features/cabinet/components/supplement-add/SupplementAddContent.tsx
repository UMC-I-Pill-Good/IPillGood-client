'use client';

import SupplementSearchSection from './SupplementSearchSection';
import SupplementsList from './SupplementsList';
import SupplementAddSection from './SupplementAddSection';
import { MascotSadIcon } from '@/assets';
import { useCabinetSearchQuery, useSupplementSelection } from '@/features/cabinet/hooks';
import { FetchError, TextButton } from '@/shared/components';
import { useEffect, useRef } from 'react';
import { SUPPLEMENT_ADD_RETURN_STATE_KEY } from '@/shared/constants/supplementAddReturnState';

interface SupplementAddReturnState {
  selectedIds: number[];
  scrollTop: number;
}

const SupplementAddContent = () => {
  const { selectedIds, setSelectedIds, toggle } = useSupplementSelection();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pendingScrollTopRef = useRef<number | null>(null);
  const hasRestoredScrollRef = useRef(false);

  const {
    setDebouncedKeyword,
    sort,
    setSort,
    products,
    isEmptySearchResult,
    isInitialLoadError,
    isFetchNextPageError,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    hasNextPage,
    loadMoreRef,
  } = useCabinetSearchQuery();

  useEffect(() => {
    const savedState = sessionStorage.getItem(SUPPLEMENT_ADD_RETURN_STATE_KEY);

    if (!savedState) {
      return;
    }

    try {
      const { selectedIds: savedSelectedIds, scrollTop }: SupplementAddReturnState =
        JSON.parse(savedState);

      if (Array.isArray(savedSelectedIds) && savedSelectedIds.every(Number.isInteger)) {
        setSelectedIds(savedSelectedIds);
      }

      if (Number.isFinite(scrollTop) && scrollTop >= 0) {
        pendingScrollTopRef.current = scrollTop;
      }
    } catch {
      // Ignore invalid stale browser session data.
    } finally {
      sessionStorage.removeItem(SUPPLEMENT_ADD_RETURN_STATE_KEY);
    }
  }, [setSelectedIds]);

  useEffect(() => {
    if (
      pendingScrollTopRef.current === null ||
      hasRestoredScrollRef.current ||
      products.length === 0
    ) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      const scrollContainer = scrollContainerRef.current;
      const targetScrollTop = pendingScrollTopRef.current;

      if (scrollContainer && targetScrollTop !== null) {
        scrollContainer.scrollTop = targetScrollTop;

        if (scrollContainer.scrollTop >= targetScrollTop) {
          hasRestoredScrollRef.current = true;
        }
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [products.length]);

  const saveReturnState = () => {
    const returnState: SupplementAddReturnState = {
      selectedIds,
      scrollTop: scrollContainerRef.current?.scrollTop ?? 0,
    };

    sessionStorage.setItem(SUPPLEMENT_ADD_RETURN_STATE_KEY, JSON.stringify(returnState));
  };

  if (isInitialLoadError) {
    return (
      <FetchError
        description='검색 결과를 불러오지 못했습니다.'
        onRetry={() => refetch()}
        className='min-h-[70vh]'
      />
    );
  }

  return (
    <section className='flex min-h-0 flex-1 flex-col'>
      <SupplementSearchSection
        onDebouncedKeywordChange={setDebouncedKeyword}
        sort={sort}
        setSort={setSort}
      />

      <div
        ref={scrollContainerRef}
        className='thin-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain'
      >
        {isEmptySearchResult ? (
          <section className='flex flex-col items-center px-5 pt-20 text-center'>
            <MascotSadIcon />
            <p className='mt-4 typo-body-6 text-primary-700'>검색 결과가 존재하지 않아요...</p>
          </section>
        ) : (
          <SupplementsList
            products={products}
            selectedIds={selectedIds}
            onToggle={toggle}
            onViewDetails={saveReturnState}
          />
        )}

        {isFetchNextPageError ? (
          <div role='alert' className='flex flex-col items-center gap-2 px-5 py-4'>
            <p className='typo-body-11 text-neutral'>추가 검색 결과를 불러오지 못했습니다.</p>
            <TextButton
              text='다시 시도'
              variant='primary'
              size='sm'
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              className='w-50'
            />
          </div>
        ) : (
          hasNextPage && <div ref={loadMoreRef} className='h-px w-full' />
        )}
      </div>

      {!isEmptySearchResult && <SupplementAddSection selectedIds={selectedIds} />}
    </section>
  );
};

export default SupplementAddContent;
