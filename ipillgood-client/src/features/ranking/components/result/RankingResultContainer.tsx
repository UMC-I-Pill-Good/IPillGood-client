'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FilterIcon } from '@/assets';
import { SearchBar } from '@/shared/components';
import { saveRecentKeyword } from '../../api/recentSearch';
import { useRankingInfiniteProducts } from '../../hooks/useRankingInfiniteProducts';
import type { RankingUiSort } from '../../types/ranking';
import {
  DEFAULT_RANKING_FILTERS,
  type RankingFilterState,
} from '../../types/rankingFilter';
import {
  appendRankingFilterSearchParams,
  getRankingFiltersFromSearchParams,
  toRankingFilterRequestOptions,
  toRankingQueryParams,
} from '../../utils/rankingFilterQuery';
import RankingFilterBottomSheet from '../default/RankingFilterBottomSheet';
import RankingSupplementList from '../default/RankingSupplementList';
import SortDropdownTrigger from '../default/SortDropdownTrigger';
import RankingResultEmptyState from './RankingResultEmptyState';
import RankingResultSkeletonCard from './RankingResultSkeletonCard';

const INITIAL_SKELETON_CARD_COUNT = 4;
const SKELETON_CARD_LOAD_COUNT = 4;
const LOAD_MORE_SKELETON_CARD_COUNT = 2;

const hasActiveFilter = (filters: RankingFilterState) =>
  filters.ageGroup !== DEFAULT_RANKING_FILTERS.ageGroup ||
  filters.gender !== DEFAULT_RANKING_FILTERS.gender ||
  filters.certification !== DEFAULT_RANKING_FILTERS.certification ||
  filters.healthConcern !== DEFAULT_RANKING_FILTERS.healthConcern;

const getActiveFilterCount = (filters: RankingFilterState) =>
  Number(filters.ageGroup !== DEFAULT_RANKING_FILTERS.ageGroup) +
  Number(filters.gender !== DEFAULT_RANKING_FILTERS.gender) +
  Number(filters.certification !== DEFAULT_RANKING_FILTERS.certification) +
  Number(filters.healthConcern !== DEFAULT_RANKING_FILTERS.healthConcern);

const RankingResultContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const initialSearchTerm =
    searchParams.get('search') ?? searchParams.get('keyword') ?? '';
  const initialFilters = getRankingFiltersFromSearchParams(
    new URLSearchParams(searchParams.toString()),
  );
  const appliedFiltersRef = useRef<RankingFilterState>(initialFilters);
  const [searchValue, setSearchValue] = useState(initialSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] =
    useState(initialSearchTerm);
  const [selectedSort, setSelectedSort] =
    useState<RankingUiSort>('REVIEW_COUNT');
  const [requestVersion, setRequestVersion] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<RankingFilterState>(initialFilters);
  const [draftFilters, setDraftFilters] =
    useState<RankingFilterState>(initialFilters);
  const [skeletonCardCount, setSkeletonCardCount] = useState(
    INITIAL_SKELETON_CARD_COUNT,
  );
  const rankingQueryParams = useMemo(
    () => ({
      size: 20,
      sort: selectedSort,
      ...toRankingQueryParams(appliedFilters),
      ...toRankingFilterRequestOptions(appliedFilters),
      keyword: submittedSearchTerm,
    }),
    [appliedFilters, selectedSort, submittedSearchTerm],
  );
  const {
    hasNext,
    isInitialLoading,
    isLoadingMore,
    items,
    loadMore,
    message,
    resetLoadingState,
    totalElements,
  } = useRankingInfiniteProducts({
    queryParams: rankingQueryParams,
    requestKey: requestVersion,
  });
  const emptyStateMessage = hasActiveFilter(appliedFilters)
    ? '해당 조건에 맞는 영양제가 없어요...'
    : '검색 결과가 존재하지 않아요...';
  const activeFilterCount = getActiveFilterCount(appliedFilters);
  const isFilteredEmpty =
    !isInitialLoading && !message && totalElements === 0 && activeFilterCount > 0;

  useEffect(() => {
    if (!isInitialLoading) return;

    const loadMoreTarget = loadMoreRef.current;
    if (!loadMoreTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setSkeletonCardCount((prevCount) => prevCount + SKELETON_CARD_LOAD_COUNT);
      },
      {
        rootMargin: '160px 0px',
      },
    );

    observer.observe(loadMoreTarget);

    return () => {
      observer.disconnect();
    };
  }, [isInitialLoading]);

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

  const refreshResults = () => {
    setRequestVersion((prevVersion) => prevVersion + 1);
  };

  const syncResultUrl = (
    nextSearchTerm: string,
    nextFilters: RankingFilterState,
  ) => {
    const nextSearchParams = new URLSearchParams({
      search: nextSearchTerm,
    });

    appendRankingFilterSearchParams(nextSearchParams, nextFilters);
    router.replace(`/ranking/result?${nextSearchParams.toString()}`);
  };

  const handleSubmitSearch = async () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;
    const nextFilters = appliedFiltersRef.current;

    await saveRecentKeyword(nextSearchTerm);
    resetLoadingState();
    setSkeletonCardCount(INITIAL_SKELETON_CARD_COUNT);
    setAppliedFilters(nextFilters);
    setSubmittedSearchTerm(nextSearchTerm);
    refreshResults();
    syncResultUrl(nextSearchTerm, nextFilters);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;

    resetLoadingState();
    setSkeletonCardCount(INITIAL_SKELETON_CARD_COUNT);
    setSelectedSort(nextSort);
    refreshResults();
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFiltersRef.current);
    setIsFilterOpen(true);
  };

  const handleResetFilter = () => {
    setDraftFilters(getRankingFiltersFromSearchParams(new URLSearchParams()));
  };

  const handleApplyFilter = () => {
    const nextFilters = draftFilters;

    resetLoadingState();
    setSkeletonCardCount(INITIAL_SKELETON_CARD_COUNT);
    appliedFiltersRef.current = nextFilters;
    setAppliedFilters(nextFilters);
    refreshResults();
    setIsFilterOpen(false);
    syncResultUrl(submittedSearchTerm, nextFilters);
  };

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden px-5 pb-24 pt-4'>
      <section className='flex w-full items-center gap-3'>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSubmitSearch}
          placeholder='브랜드, 영양 성분을 검색해 보세요.'
          className='h-12 flex-1 rounded-2xl bg-white px-3 py-3 text-primary-600 shadow-none backdrop-blur-none'
          inputClassName='min-w-0 px-1 typo-body-11 placeholder:text-neutral-800'
          searchIconClassName='size-5'
          searchIconSize={20}
          rightElement={
            !searchValue.trim() ? (
              <button
                type='button'
                aria-label='필터 열기'
                className='inline-flex size-5 shrink-0 items-center justify-center self-center text-primary-500'
                onClick={handleOpenFilter}
              >
                <FilterIcon aria-hidden='true' className='block size-5' />
              </button>
            ) : undefined
          }
        />
        <button
          type='button'
          className='glass rounded-full px-3 typo-caption-2 text-primary-600'
          onClick={() => router.push('/ranking')}
        >
          취소
        </button>
      </section>

      {isFilteredEmpty && (
        <button
          type='button'
          aria-label={`필터 ${activeFilterCount}개 수정하기`}
          className='mt-5 inline-flex w-fit items-center gap-1 rounded-lg border border-primary-600 bg-primary-200 px-3 py-2 typo-body-10 text-black'
          onClick={handleOpenFilter}
        >
          <FilterIcon aria-hidden='true' className='size-5 text-primary-600' />
          <span>필터</span>
          <span className='flex size-6 items-center justify-center rounded-full bg-primary-500 text-white'>
            {activeFilterCount}
          </span>
        </button>
      )}

      {isInitialLoading ? (
        <section
          className='mt-8 flex w-full flex-col gap-3'
          aria-label='검색 결과를 불러오는 중'
          aria-busy='true'
        >
          {Array.from({ length: skeletonCardCount }, (_, index) => (
            <RankingResultSkeletonCard key={index} />
          ))}
          <div ref={loadMoreRef} className='h-px w-full' />
        </section>
      ) : (
        <section className='mt-7 flex w-full flex-col gap-3'>
          <div className='flex w-full items-center justify-between gap-3'>
            <div className='flex min-w-0 items-end gap-1'>
              <h1 className='typo-body-5 text-black'>검색 결과</h1>
              <span className='pb-0.5 typo-caption-7 text-neutral-800'>
                {totalElements}개
              </span>
            </div>
            <SortDropdownTrigger
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          </div>

          {message ? (
            <section className='flex min-h-32 w-full items-center justify-center rounded-2xl bg-white/50 px-5 py-8 typo-caption-2 text-neutral-800'>
              {message}
            </section>
          ) : (
            <RankingSupplementList
              items={items}
              emptyState={<RankingResultEmptyState message={emptyStateMessage} />}
            />
          )}
          {isLoadingMore && (
            <section
              className='flex w-full flex-col gap-3'
              aria-label='검색 결과를 추가로 불러오는 중'
              aria-busy='true'
            >
              {Array.from(
                { length: LOAD_MORE_SKELETON_CARD_COUNT },
                (_, index) => (
                  <RankingResultSkeletonCard key={index} />
                ),
              )}
            </section>
          )}
          <div ref={loadMoreRef} className='h-px w-full' />
        </section>
      )}

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

export default RankingResultContainer;
