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

  // 검색어와 정렬 기준으로 무한 스크롤 검색
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

  const products = data?.pages.flatMap((page) => page.result.products) ?? []; // 모든 페이지의 상품을 하나의 배열로 합침
  const isEmptySearchResult = isSuccess && debouncedKeyword !== null && products.length === 0;

  // 하단 감지용 Intersection Observer
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '160px 0px',
    skip: !hasNextPage,
  });

  // 하단이 보이면 다음 페이지 조회
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className='flex min-h-0 flex-1 flex-col'>
      <SupplementSearchSection
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
          <SupplementSortList products={products} selectedIds={selectedIds} onToggle={toggle} />
        )}

        {hasNextPage && <div ref={loadMoreRef} className='h-px w-full' />}
      </div>

      {!isEmptySearchResult && <SupplementAddSection selectedIds={selectedIds} />}
    </section>
  );
};

export default SupplementSearchContent;
