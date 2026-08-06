'use client';

import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRanking } from '../api/getRanking';
import type { RankingQueryParams } from '../types/ranking';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_ERROR_MESSAGE = '영양제 상품 목록을 불러올 수 없습니다.';

interface UseRankingInfiniteProductsParams {
  queryParams: RankingQueryParams;
  requestKey?: number;
}

export const useRankingInfiniteProducts = ({
  queryParams,
  requestKey = 0,
}: UseRankingInfiniteProductsParams) => {
  const rankingQuery = useInfiniteQuery({
    queryKey: ['rankingProducts', queryParams, requestKey],
    queryFn: async ({ pageParam }) => {
      const response = await getRanking({
        ...queryParams,
        size: queryParams.size ?? DEFAULT_PAGE_SIZE,
        cursor: pageParam,
      });

      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || DEFAULT_ERROR_MESSAGE);
      }

      return response.result;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor ? lastPage.nextCursor : undefined,
  });

  const items = rankingQuery.data?.pages.flatMap((page) => page.products) ?? [];
  const totalElements = rankingQuery.data?.pages[0]?.totalCount ?? 0;
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError } = rankingQuery;
  const message =
    rankingQuery.isError && !rankingQuery.data
      ? rankingQuery.error instanceof Error
        ? rankingQuery.error.message
        : DEFAULT_ERROR_MESSAGE
      : null;

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError]);

  return {
    hasNext: hasNextPage,
    isInitialLoading: rankingQuery.isPending,
    isLoadingMore: isFetchingNextPage,
    items,
    loadMore,
    message,
    totalElements,
  };
};
