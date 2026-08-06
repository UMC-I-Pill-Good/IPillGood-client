'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRankingInfiniteProducts } from '../../hooks/useRankingInfiniteProducts';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import type { RankingUiSort } from '../../types/ranking';
import { DEFAULT_RANKING_FILTERS } from '../../constants/rankingFilter';
import type { RankingFilterState } from '../../types/rankingFilter';
import {
  appendRankingFilterSearchParams,
  toRankingFilterRequestOptions,
  toRankingQueryParams,
} from '../../utils/rankingFilterQuery';
import RankingFilterBottomSheet from './RankingFilterBottomSheet';
import RankingProductSection from './RankingProductSection';
import RankingSearchBar from './RankingSearchBar';
import RecentSearches from './RecentSearches';

const RankingContainer = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [selectedSort, setSelectedSort] = useState<RankingUiSort>('REVIEW_COUNT');
  const [requestVersion, setRequestVersion] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RankingFilterState>(DEFAULT_RANKING_FILTERS);
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(DEFAULT_RANKING_FILTERS);
  const {
    recentSearchList,
    handleSaveRecentSearch,
    handleRemoveRecentSearch,
    handleClearRecentSearches,
  } = useRecentSearches();
  const rankingQueryParams = {
    size: 20,
    sort: selectedSort,
    keyword: '',
    ...toRankingQueryParams(appliedFilters),
    ...toRankingFilterRequestOptions(appliedFilters),
  };
  const { hasNext, isInitialLoading, isLoadingMore, items, loadMore, message } =
    useRankingInfiniteProducts({ queryParams: rankingQueryParams, requestKey: requestVersion });
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '160px 0px',
    skip: !hasNext,
  });

  useEffect(() => {
    if (inView && hasNext && !isLoadingMore) {
      loadMore();
    }
  }, [hasNext, inView, isLoadingMore, loadMore]);

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFilters);
    setIsFilterOpen(true);
  };

  const handleResetFilter = () => {
    setDraftFilters(DEFAULT_RANKING_FILTERS);
  };

  const handleApplyFilter = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;

    setSelectedSort(nextSort);
  };

  const handleRetry = () => {
    setRequestVersion((version) => version + 1);
  };

  const handleSubmitSearch = async () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;
    await handleSaveRecentSearch(nextSearchTerm);

    const searchParams = new URLSearchParams({
      search: nextSearchTerm,
    });

    appendRankingFilterSearchParams(searchParams, appliedFilters);
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

      <RecentSearches
        searches={recentSearchList}
        onRemove={handleRemoveRecentSearch}
        onClear={handleClearRecentSearches}
      />

      <RankingProductSection
        selectedSort={selectedSort}
        items={items}
        message={message}
        isInitialLoading={isInitialLoading}
        isLoadingMore={isLoadingMore}
        loadMoreRef={loadMoreRef}
        onSortChange={handleSortChange}
        onRetry={handleRetry}
      />

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
