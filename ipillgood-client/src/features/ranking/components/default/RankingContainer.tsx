'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  clearRecentKeywords,
  deleteRecentKeyword,
  getRecentKeywords,
  saveRecentKeyword,
} from '../../api/recentSearch';
import { useRankingInfiniteProducts } from '../../hooks/useRankingInfiniteProducts';
import type { RankingUiSort } from '../../types/ranking';
import type { RecentKeywordDto } from '../../types/recentSearch';
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
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<RecentKeywordDto[]>([]);
  const [selectedSort, setSelectedSort] = useState<RankingUiSort>('REVIEW_COUNT');
  const [requestVersion, setRequestVersion] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RankingFilterState>(DEFAULT_RANKING_FILTERS);
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(DEFAULT_RANKING_FILTERS);
  const rankingQueryParams = {
    size: 20,
    sort: selectedSort,
    keyword: '',
    ...toRankingQueryParams(appliedFilters),
    ...toRankingFilterRequestOptions(appliedFilters),
  };
  const { hasNext, isInitialLoading, isLoadingMore, items, loadMore, message, resetLoadingState } =
    useRankingInfiniteProducts({ queryParams: rankingQueryParams, requestKey: requestVersion });

  useEffect(() => {
    let isMounted = true;

    getRecentKeywords()
      .then((response) => {
        if (!isMounted || !response.isSuccess) return;

        setRecentSearches(response.result?.keywords ?? []);
      })
      .catch((error) => {
        console.error('Failed to load recent keywords', error);
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
  };

  const handleRemoveRecentSearch = async (keywordId: number) => {
    try {
      const response = await deleteRecentKeyword(keywordId);
      if (!response.isSuccess) return;

      setRecentSearches((prevSearches) =>
        prevSearches.filter((item) => item.keywordId !== keywordId),
      );
    } catch (error) {
      console.error('Failed to delete recent keyword', error);
    }
  };

  const handleClearRecentSearches = async () => {
    try {
      const response = await clearRecentKeywords();
      if (!response.isSuccess) return;

      setRecentSearches([]);
    } catch (error) {
      console.error('Failed to clear recent keywords', error);
    }
  };

  const handleOpenFilter = () => {
    setDraftFilters(appliedFilters);
    setIsFilterOpen(true);
  };

  const handleResetFilter = () => {
    setDraftFilters(DEFAULT_RANKING_FILTERS);
  };

  const handleApplyFilter = () => {
    resetLoadingState();
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleSortChange = (nextSort: RankingUiSort) => {
    if (nextSort === selectedSort) return;

    resetLoadingState();
    setSelectedSort(nextSort);
  };

  const handleRetry = () => {
    resetLoadingState();
    setRequestVersion((version) => version + 1);
  };

  const handleSubmitSearch = async () => {
    const nextSearchTerm = searchValue.trim();
    if (!nextSearchTerm) return;
    try {
      const recentKeywordResponse = await saveRecentKeyword(nextSearchTerm);
      const savedKeyword = recentKeywordResponse.result;

      if (recentKeywordResponse.isSuccess && savedKeyword) {
        setRecentSearches((prevSearches) =>
          [
            savedKeyword,
            ...prevSearches.filter((item) => item.keyword !== savedKeyword.keyword),
          ].slice(0, 10),
        );
      } else {
        console.error('Failed to save recent keyword', recentKeywordResponse.message);
      }
    } catch (error) {
      console.error('Failed to save recent keyword', error);
    }

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
        searches={recentSearches}
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
