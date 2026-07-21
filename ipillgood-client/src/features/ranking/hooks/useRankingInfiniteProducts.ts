import { useCallback, useEffect, useRef, useState } from 'react';
import { getRanking } from '../api/getRanking';
import type { ProductSearchItemDto, RankingQueryParams } from '../types/ranking';

const DEFAULT_PAGE_SIZE = 20;

interface UseRankingInfiniteProductsParams {
  queryParams: RankingQueryParams;
  requestKey?: number;
}

export const useRankingInfiniteProducts = ({
  queryParams,
  requestKey = 0,
}: UseRankingInfiniteProductsParams) => {
  const requestIdRef = useRef(0);
  const isRequestingRef = useRef(false);
  const [items, setItems] = useState<ProductSearchItemDto[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const pageSize = queryParams.size ?? DEFAULT_PAGE_SIZE;

  const resetLoadingState = useCallback(() => {
    requestIdRef.current += 1;
    isRequestingRef.current = false;
    setItems([]);
    setTotalElements(0);
    setMessage(null);
    setNextCursor(null);
    setHasNext(false);
    setIsLoadingMore(false);
    setIsInitialLoading(true);
  }, []);

  useEffect(() => {
    const requestId = requestIdRef.current;
    let isMounted = true;
    isRequestingRef.current = true;

    getRanking({
      ...queryParams,
      size: pageSize,
      cursor: undefined,
    })
      .then((response) => {
        if (!isMounted || requestId !== requestIdRef.current) return;

        if (!response.isSuccess) {
          setItems([]);
          setTotalElements(0);
          setNextCursor(null);
          setHasNext(false);
          setMessage(response.message);
          return;
        }

        setItems(response.result?.products ?? []);
        setTotalElements(response.result?.totalElements ?? 0);
        setNextCursor(response.result?.nextCursor ?? null);
        setHasNext(response.result?.hasNext ?? false);
        setMessage(null);
      })
      .catch(() => {
        if (!isMounted || requestId !== requestIdRef.current) return;

        setItems([]);
        setTotalElements(0);
        setNextCursor(null);
        setHasNext(false);
        setMessage('영양제 상품 목록을 불러올 수 없습니다.');
      })
      .finally(() => {
        if (!isMounted || requestId !== requestIdRef.current) return;

        isRequestingRef.current = false;
        setIsInitialLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [
    pageSize,
    queryParams,
    requestKey,
  ]);

  const loadMore = useCallback(() => {
    if (
      !hasNext ||
      !nextCursor ||
      isInitialLoading ||
      isLoadingMore ||
      isRequestingRef.current
    ) {
      return;
    }

    const requestId = requestIdRef.current;
    isRequestingRef.current = true;
    setIsLoadingMore(true);

    getRanking({
      ...queryParams,
      size: pageSize,
      cursor: nextCursor,
    })
      .then((response) => {
        if (requestId !== requestIdRef.current) return;

        if (!response.isSuccess) {
          setMessage(response.message);
          return;
        }

        setItems((prevItems) => [
          ...prevItems,
          ...(response.result?.products ?? []),
        ]);
        setTotalElements(response.result?.totalElements ?? 0);
        setNextCursor(response.result?.nextCursor ?? null);
        setHasNext(response.result?.hasNext ?? false);
        setMessage(null);
      })
      .catch(() => {
        if (requestId !== requestIdRef.current) return;

        setMessage('영양제 상품 목록을 불러올 수 없습니다.');
      })
      .finally(() => {
        if (requestId !== requestIdRef.current) return;

        isRequestingRef.current = false;
        setIsLoadingMore(false);
      });
  }, [
    hasNext,
    isInitialLoading,
    isLoadingMore,
    nextCursor,
    pageSize,
    queryParams,
  ]);

  return {
    hasNext,
    isInitialLoading,
    isLoadingMore,
    items,
    loadMore,
    message,
    resetLoadingState,
    totalElements,
  };
};
