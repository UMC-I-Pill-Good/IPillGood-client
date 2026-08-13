import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRankingProductDetail } from '@/features/ranking/api/getRankingProductDetail';

import { getProductReviews } from '../api/getProductReviews';
import { reviewQueryKeys } from '../constants/reviewQueryKeys';
import type { ReviewSort } from '../types/review';

export const useProductReviews = (productId: number) => {
  const [sort, setSort] = useState<ReviewSort>('LATEST');
  const productQuery = useQuery({
    queryKey: reviewQueryKeys.product(productId),
    queryFn: async () => {
      const response = await getRankingProductDetail(productId);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result;
    },
  });
  const reviewQuery = useInfiniteQuery({
    queryKey: [...reviewQueryKeys.productReviews(productId), sort],
    queryFn: async ({ pageParam }) => {
      const response = await getProductReviews({ productId, sort, size: 20, cursor: pageParam });
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor ? lastPage.nextCursor : undefined,
  });

  const reviewList = reviewQuery.data?.pages.flatMap((page) => page.reviews) ?? [];
  const reviewCount = reviewQuery.data?.pages[0]?.reviewCount ?? 0;
  const isPending = productQuery.isPending || reviewQuery.isPending;
  const isInitialError = productQuery.isError || (reviewQuery.isError && !reviewQuery.data);
  const handleRetry = () => {
    void Promise.all([productQuery.refetch(), reviewQuery.refetch()]);
  };

  return {
    sort,
    setSort,
    productQuery,
    reviewQuery,
    reviewList,
    reviewCount,
    isPending,
    isInitialError,
    handleRetry,
  };
};
