'use client';

import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRanking } from '../api/getRanking';
import { rankingQueryKeys } from '../constants/rankingQueryKeys';
import type { RankingQueryParams } from '../types/ranking';

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_ERROR_MESSAGE = '영양제 상품 목록을 불러올 수 없습니다.';

type UseRankingInfiniteProductsParams = {
  queryParams: RankingQueryParams;
};

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;

export const useRankingInfiniteProducts = ({ queryParams }: UseRankingInfiniteProductsParams) => {
  const rankingQuery = useInfiniteQuery({
    queryKey: [...rankingQueryKeys.products(), queryParams],
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
    rankingQuery.isError && !rankingQuery.data ? getErrorMessage(rankingQuery.error) : null;
  const loadMoreErrorMessage = isFetchNextPageError ? getErrorMessage(rankingQuery.error) : null;
  const filterRequestErrorMessage =
    rankingQuery.isError && !isFetchNextPageError ? getErrorMessage(rankingQuery.error) : null;

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage || isFetchNextPageError) return;

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError]);

  const retryLoadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    void fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    hasNext: hasNextPage,
    filterRequestErrorMessage,
    isFilterRequestFetching: rankingQuery.isFetching && !isFetchingNextPage,
    isInitialLoading: rankingQuery.isPending,
    isLoadingMore: isFetchingNextPage,
    items,
    loadMore,
    loadMoreErrorMessage,
    message,
    refetch: rankingQuery.refetch,
    retryLoadMore,
    totalElements,
  };
};
