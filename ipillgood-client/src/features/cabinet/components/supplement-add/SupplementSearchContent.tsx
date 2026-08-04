'use client';

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SupplementSearchSection from './SupplementSearchSection';
import SupplementSortList from './SupplementSortList';
import SupplementAddSection from './SupplementAddSection';
import { MascotSadIcon } from '@/assets';
import { getCabinetProductsSearch } from '@/features/cabinet/api/cabinet';
import { useSupplementSelection } from '@/features/cabinet/hooks';
import { useInView } from 'react-intersection-observer';

const SupplementSearchContent = () => {
  const [debouncedKeyword, setDebouncedKeyword] = useState<string | null>(null);
  const { selectedIds, toggle } = useSupplementSelection();
  const [sort, setSort] = useState<'후기 많은 순' | '평점 높은 순'>('후기 많은 순');

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['cabinetProductsSearch', debouncedKeyword, sort],
    queryFn: ({ pageParam }) =>
      getCabinetProductsSearch({
        keyword: debouncedKeyword,
        sort: sort === '후기 많은 순' ? 'REVIEW_COUNT_DESC' : 'RATING_DESC',
        page: pageParam,
        size: 20,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.page + 1 : undefined,
  });

  const products = data?.pages.flatMap((page) => page.result.products) ?? [];
  const isEmptySearchResult = isSuccess && debouncedKeyword !== null && products.length === 0;

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '160px 0px',
    skip: !hasNextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <SupplementSearchSection
        onDebouncedKeywordChange={setDebouncedKeyword}
        sort={sort}
        setSort={setSort}
      />

      {isEmptySearchResult ? (
        <section className='flex flex-col items-center px-5 pt-20 text-center'>
          <MascotSadIcon />
          <p className='mt-4 typo-body-6 text-primary-700'>검색 결과가 존재하지 않아요...</p>
        </section>
      ) : (
        <SupplementSortList products={products} selectedIds={selectedIds} onToggle={toggle} />
      )}

      {hasNextPage && <div ref={loadMoreRef} className='h-px w-full' />}

      {!isEmptySearchResult && <SupplementAddSection selectedIds={selectedIds} />}
    </>
  );
};

export default SupplementSearchContent;
