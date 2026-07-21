'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  clearRecentKeywords,
  deleteRecentKeyword,
  getRecentKeywords,
  saveRecentKeyword,
} from '../../api/recentSearch';
import { useRankingInfiniteProducts } from '../../hooks/useRankingInfiniteProducts';
import type { RankingUiSort } from '../../types/ranking';
import type { RecentKeywordDto } from '../../types/recentSearch';
import {
  DEFAULT_RANKING_FILTERS,
  type RankingFilterState,
} from '../../types/rankingFilter';
import {
  appendRankingFilterSearchParams,
} from '../../utils/rankingFilterQuery';
import RankingResultSkeletonCard from '../result/RankingResultSkeletonCard';
import RankingFilterBottomSheet from './RankingFilterBottomSheet';
import RankingSearchBar from './RankingSearchBar';
import RankingSupplementList from './RankingSupplementList';
import RankingToolbar from './RankingToolbar';
import RecentSearches from './RecentSearches';

const RANKING_SKELETON_CARD_COUNT = 4;
const RANKING_LOAD_MORE_SKELETON_CARD_COUNT = 2;

const RankingContainer = () => {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentKeywordDto[]>([]);
  const [selectedSort, setSelectedSort] =
    useState<RankingUiSort>('REVIEW_COUNT');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const appliedFiltersRef = useRef<RankingFilterState>(DEFAULT_RANKING_FILTERS);
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(
    DEFAULT_RANKING_FILTERS,
  );
  const rankingQueryParams = useMemo(
    () => ({
      size: 20,
      sort: selectedSort,
      keyword: submittedSearchTerm,
    }),
    [selectedSort, submittedSearchTerm],
  );
  const {
    hasNext,
    isInitialLoading,
    isLoadingMore,
    items,
    loadMore,
    message,
    resetLoadingState,
  } = useRankingInfiniteProducts({ queryParams: rankingQueryParams });

  useEffect(() => {
    let isMounted = true;

    getRecentKeywords().then((response) => {
      if (!isMounted || !response.isSuccess) return;

      setRecentSearches(response.result?.keywords ?? []);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hasNext || isInitialLoading || isLoadingMore) return;

    const loadMoreTarget = loadMoreRef.current;
    if (!loadMoreTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        loadMore();
      },
      {
        rootMargin: '160px 0px',
      },
    );

    observer.observe(loadMoreTarget);

    return () => {
      observer.disconnect();
    };
  }, [hasNext, isInitialLoading, isLoadingMore, loadMore]);

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setSubmittedSearchTerm('');
    }
  };

  const handleRemoveRecentSearch = async (keywordId: number) => {
    const response = await deleteRecentKeyword(keywordId);
    if (!response.isSuccess) return;

    setRecentSearches((prevSearches) =>
      prevSearches.filter((item) => item.keywordId !== keywordId),
    );
  };

  const handleClearRecentSearches = async () => {
    const response = await clearRecentKeywords();
    if (!response.isSuccess) return;

    setRecentSearches([]);
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFiltersRef.current);
    setIsFilterOpen(true);
  };

  const handleResetFilter = () => {
    setDraftFilters(DEFAULT_RANKING_FILTERS);
  };

  const handleApplyFilter = () => {
    appliedFiltersRef.current = draftFilters;
    setIsFilterOpen(false);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;

    resetLoadingState();
    setSelectedSort(nextSort);
  };

  const handleSubmitSearch = async () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;
    const recentKeywordResponse = await saveRecentKeyword(nextSearchTerm);

    const savedKeyword = recentKeywordResponse.result;

    if (recentKeywordResponse.isSuccess && savedKeyword) {
      setRecentSearches((prevSearches) => [
        savedKeyword,
        ...prevSearches.filter((item) => item.keyword !== savedKeyword.keyword),
      ].slice(0, 10));
    }

    const searchParams = new URLSearchParams({
      search: nextSearchTerm,
    });

    appendRankingFilterSearchParams(searchParams, appliedFiltersRef.current);
    router.push(`/ranking/result?${searchParams.toString()}`);
  };

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden pb-24'>
      <section className='px-5 pb-3 pt-4'>
        <RankingSearchBar
          value={searchValue}
          onChange={handleChangeSearchValue}
          onFilterClick={handleOpenFilter}
          onSearch={handleSubmitSearch}
        />
      </section>

      {!submittedSearchTerm && (
          <RecentSearches
            searches={recentSearches}
            onRemove={handleRemoveRecentSearch}
            onClear={handleClearRecentSearches}
          />
      )}

      <section className='w-full px-5 py-4'>
        <div className='flex w-full flex-col gap-3'>
          <RankingToolbar
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
          />
          {isInitialLoading ? (
            <section
              className='flex w-full flex-col gap-3'
              aria-label='랭킹 데이터를 불러오는 중'
              aria-busy='true'
            >
              {Array.from({ length: RANKING_SKELETON_CARD_COUNT }, (_, index) => (
                <RankingResultSkeletonCard key={index} />
              ))}
            </section>
          ) : message ? (
            <section className='flex min-h-32 w-full items-center justify-center rounded-2xl bg-white/50 px-5 py-8 typo-caption-2 text-neutral-800'>
              {message}
            </section>
          ) : (
            <>
              <RankingSupplementList items={items} />
              {isLoadingMore && (
                <section
                  className='flex w-full flex-col gap-3'
                  aria-label='랭킹 데이터를 추가로 불러오는 중'
                  aria-busy='true'
                >
                  {Array.from(
                    { length: RANKING_LOAD_MORE_SKELETON_CARD_COUNT },
                    (_, index) => (
                      <RankingResultSkeletonCard key={index} />
                    ),
                  )}
                </section>
              )}
              <div ref={loadMoreRef} className='h-px w-full' />
            </>
          )}
        </div>
      </section>

      <RankingFilterBottomSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        draftFilters={draftFilters}
        onDraftFiltersChange={setDraftFilters}
        onReset={handleResetFilter}
        onApply={handleApplyFilter}
      />
    </main>
  );
};

export default RankingContainer;
