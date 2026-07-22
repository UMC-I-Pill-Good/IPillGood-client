'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { saveRecentKeyword } from '../api/recentSearch';
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
  const initialSearchTerm = searchParams.get('search') ?? searchParams.get('keyword') ?? '';
  const initialFilters = getRankingFiltersFromSearchParams(
    new URLSearchParams(searchParams.toString()),
  );
  const [searchValue, setSearchValue] = useState(initialSearchTerm);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(initialSearchTerm);
  const [selectedSort, setSelectedSort] = useState<RankingUiSort>('REVIEW_COUNT');
  const [requestVersion, setRequestVersion] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RankingFilterState>(initialFilters);
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(initialFilters);
  const [skeletonCardCount, setSkeletonCardCount] = useState(INITIAL_SKELETON_CARD_COUNT);
  const rankingQueryParams = {
    size: 20,
    sort: selectedSort,
    keyword: submittedSearchTerm,
    ...toRankingQueryParams(appliedFilters),
    ...toRankingFilterRequestOptions(appliedFilters),
  };
  const ranking = useRankingInfiniteProducts({
    queryParams: rankingQueryParams,
    requestKey: requestVersion,
  });
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

  const refreshResults = () => {
    ranking.resetLoadingState();
    setSkeletonCardCount(INITIAL_SKELETON_CARD_COUNT);
    setRequestVersion((version) => version + 1);
  };

  const syncResultUrl = (nextSearchTerm: string, nextFilters: RankingFilterState) => {
    const nextSearchParams = new URLSearchParams({ search: nextSearchTerm });
    appendRankingFilterSearchParams(nextSearchParams, nextFilters);
    router.replace(`/ranking/result?${nextSearchParams.toString()}`);
  };

  const handleSubmitSearch = async () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;

    try {
      const response = await saveRecentKeyword(nextSearchTerm);
      if (!response.isSuccess) {
        console.error('Failed to save recent keyword', response.message);
      }
    } catch (error) {
      console.error('Failed to save recent keyword', error);
    }

    refreshResults();
    setSubmittedSearchTerm(nextSearchTerm);
    syncResultUrl(nextSearchTerm, appliedFilters);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;
    refreshResults();
    setSelectedSort(nextSort);
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFilters);
    setIsFilterOpen(true);
  };

  const handleApplyFilter = () => {
    const nextFilters = draftFilters;
    refreshResults();
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
