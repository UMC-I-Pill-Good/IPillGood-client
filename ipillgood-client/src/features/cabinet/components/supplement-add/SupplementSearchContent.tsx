'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import SupplementSearchSection from './SupplementSearchSection';
import SupplementSortList from './SupplementSortList';
import SupplementAddSection from './SupplementAddSection';

import { MascotSadIcon } from '@/assets';
import { getCabinetProductsSearch } from '@/features/cabinet/api/cabinet';

const SupplementSearchContent = () => {
  const [debouncedKeyword, setDebouncedKeyword] = useState<string | null>(null);

  const [sort, setSort] = useState<'후기 많은 순' | '평점 높은 순'>('후기 많은 순');

  const { data, isSuccess } = useQuery({
    queryKey: ['cabinet-products-search', debouncedKeyword, sort],

    queryFn: () =>
      getCabinetProductsSearch({
        keyword: debouncedKeyword,
        sort: sort === '후기 많은 순' ? 'REVIEW_COUNT_DESC' : 'RATING_DESC',
        page: 0,
        size: 20,
      }),
  });

  const products = data?.result.products ?? [];
  const isEmptySearchResult = isSuccess && debouncedKeyword !== null && products.length === 0;

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
        <SupplementSortList products={products} />
      )}

      {!isEmptySearchResult && <SupplementAddSection />}
    </>
  );
};

export default SupplementSearchContent;
