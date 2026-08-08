'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DEFAULT_RANKING_FILTERS } from '../constants/rankingFilter';
import type { RankingUiSort } from '../types/ranking';
import type { RankingFilterState } from '../types/rankingFilter';
import {
  appendRankingFilterSearchParams,
  getRankingFiltersFromSearchParams,
  toRankingFilterRequestOptions,
  toRankingQueryParams,
} from '../utils/rankingFilterQuery';
import { useRankingInfiniteProducts } from './useRankingInfiniteProducts';
import { useSaveRecentSearch } from './useRecentSearches';

const INITIAL_SKELETON_CARD_COUNT = 4;

const getActiveFilterCount = (filters: RankingFilterState) =>
  Number(filters.ageGroup !== DEFAULT_RANKING_FILTERS.ageGroup) +
  Number(filters.gender !== DEFAULT_RANKING_FILTERS.gender) +
  Number(filters.certification !== DEFAULT_RANKING_FILTERS.certification) +
  Number(filters.healthConcern !== DEFAULT_RANKING_FILTERS.healthConcern) +
  Number(filters.ingredientIds.length > 0);

export const useRankingResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const initialSearchTerm = searchParams.get('search') ?? searchParams.get('keyword') ?? '';
  const initialFilters = getRankingFiltersFromSearchParams(
    new URLSearchParams(searchParams.toString()),
  );
  const [searchValue, setSearchValue] = useState(initialSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(initialSearchTerm);
  const [selectedSort, setSelectedSort] = useState<RankingUiSort>('REVIEW_COUNT');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RankingFilterState>(initialFilters);
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(initialFilters);
  const [skeletonCardCount, setSkeletonCardCount] = useState(INITIAL_SKELETON_CARD_COUNT);
  const [lastSearchParamsKey, setLastSearchParamsKey] = useState(searchParamsKey);

  if (searchParamsKey !== lastSearchParamsKey) {
    const nextSearchParams = new URLSearchParams(searchParamsKey);
    const nextSearchTerm = nextSearchParams.get('search') ?? nextSearchParams.get('keyword') ?? '';
    const nextFilters = getRankingFiltersFromSearchParams(nextSearchParams);

    setLastSearchParamsKey(searchParamsKey);
    setSearchValue(nextSearchTerm);
    setSubmittedSearchTerm(nextSearchTerm);
    setAppliedFilters(nextFilters);
    setDraftFilters(nextFilters);
  }
  const rankingQueryParams = {
    size: 20,
    sort: selectedSort,
    keyword: submittedSearchTerm,
    ...toRankingQueryParams(appliedFilters),
    ...toRankingFilterRequestOptions(appliedFilters),
  };
  const ranking = useRankingInfiniteProducts({ queryParams: rankingQueryParams });
  const handleSaveRecentSearch = useSaveRecentSearch();
  const activeFilterCount = getActiveFilterCount(appliedFilters);
  const viewState: 'loading' | 'error' | 'success' | 'emptyFilter' | 'emptySearch' =
    ranking.isInitialLoading
      ? 'loading'
      : ranking.message
        ? 'error'
        : ranking.totalElements > 0
          ? 'success'
          : activeFilterCount > 0
            ? 'emptyFilter'
            : 'emptySearch';

  const resetSkeletonCardCount = () => {
    setSkeletonCardCount(INITIAL_SKELETON_CARD_COUNT);
  };

  const syncResultUrl = (nextSearchTerm: string, nextFilters: RankingFilterState) => {
    const nextSearchParams = new URLSearchParams({ search: nextSearchTerm });
    appendRankingFilterSearchParams(nextSearchParams, nextFilters);
    router.replace(`/ranking/result?${nextSearchParams.toString()}`);
  };

  const handleSubmitSearch = () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;

    handleSaveRecentSearch(nextSearchTerm);
    resetSkeletonCardCount();
    setSubmittedSearchTerm(nextSearchTerm);
    syncResultUrl(nextSearchTerm, appliedFilters);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;
    resetSkeletonCardCount();
    setSelectedSort(nextSort);
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFilters);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    const nextFilters = draftFilters;
    resetSkeletonCardCount();
    setAppliedFilters(nextFilters);
    setIsFilterOpen(false);
    syncResultUrl(submittedSearchTerm, nextFilters);
  };

  return {
    activeFilterCount,
    handleApplyFilter,
    handleCancel: () => router.push('/ranking'),
    handleCloseFilter: () => setIsFilterOpen(false),
    handleOpenFilter,
    handleRetry: () => {
      resetSkeletonCardCount();
      void ranking.refetch();
    },
    handleResetFilter: () => setDraftFilters(DEFAULT_RANKING_FILTERS),
    handleSortChange,
    handleSubmitSearch,
    draftFilters,
    isFilterOpen,
    ranking,
    searchValue,
    selectedSort,
    setDraftFilters,
    setSearchValue,
    setSkeletonCardCount,
    skeletonCardCount,
    submittedSearchTerm,
    viewState,
  };
};
