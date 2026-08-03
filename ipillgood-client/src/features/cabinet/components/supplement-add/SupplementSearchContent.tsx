'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import SupplementSearchSection from './SupplementSearchSection';
import SupplementSortList from './SupplementSortList';

import { getCabinetProductsSearch } from '@/features/cabinet/api/cabinet';
import { useDebounce } from '@/shared/hooks/useDebounce';

const SupplementSearchContent = () => {
  const [keyword, setKeyword] = useState('');

  const debouncedKeyword = useDebounce(keyword, 500);

  const [sort, setSort] = useState<'후기 많은 순' | '평점 높은 순'>('후기 많은 순');

  const { data } = useQuery({
    queryKey: ['cabinet-products-search', debouncedKeyword, sort],

    queryFn: () =>
      getCabinetProductsSearch({
        keyword: debouncedKeyword,
        sort: sort === '후기 많은 순' ? 'REVIEW_COUNT_DESC' : 'RATING_DESC',
        page: 0,
        size: 20,
      }),

    enabled: debouncedKeyword.length > 0,
  });

  return (
    <>
      <SupplementSearchSection
        keyword={keyword}
        setKeyword={setKeyword}
        sort={sort}
        setSort={setSort}
      />

      <SupplementSortList products={data?.result.products ?? []} />
    </>
  );
};

export default SupplementSearchContent;
