'use client';

import { useEffect, useState } from 'react';
import { INITIAL_RECENT_SEARCHES } from '../constants/recentSearches';
import { getMockRanking } from '../services/rankingMockService';
import {
  DEFAULT_RANKING_FILTERS,
  type RankingFilterState,
} from '../types/rankingFilter';
import type { RankingItemDto, RankingUiSort } from '../types/ranking';
import RankingFilterBottomSheet from './RankingFilterBottomSheet';
import RankingSearchBar from './RankingSearchBar';
import RankingSupplementList from './RankingSupplementList';
import RankingToolbar from './RankingToolbar';
import RecentSearches from './RecentSearches';

const RankingPageContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [hasSubmittedSearch, setHasSubmittedSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    ...INITIAL_RECENT_SEARCHES,
  ]);
  const [selectedSort, setSelectedSort] =
    useState<RankingUiSort>('REVIEW_COUNT');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<RankingFilterState>(
    DEFAULT_RANKING_FILTERS,
  );
  const [draftFilters, setDraftFilters] = useState<RankingFilterState>(
    DEFAULT_RANKING_FILTERS,
  );
  const [items, setItems] = useState<RankingItemDto[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getMockRanking(
      {
        page: 0,
        size: 20,
      },
      {
        uiSort: selectedSort,
      },
    ).then((response) => {
      if (!isMounted) return;

      if (!response.isSuccess) {
        setItems([]);
        setMessage(response.message);
        return;
      }

      if (!response.result) {
        setItems([]);
        setMessage('랭킹 데이터를 불러올 수 없습니다.');
        return;
      }

      setItems(response.result.items);
      setMessage(null);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedSort]);

  const handleRemoveRecentSearch = (searchTerm: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((item) => item !== searchTerm),
    );
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

  const handleSubmitSearch = () => {
    if (!searchValue.trim()) return;
    setHasSubmittedSearch(true);
  };

  const handleClearSearch = () => {
    setHasSubmittedSearch(false);
  };

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden pb-24'>
      <section className='px-5 pb-3 pt-4'>
        <RankingSearchBar
          value={searchValue}
          onChange={setSearchValue}
          onClear={handleClearSearch}
          onFilterClick={handleOpenFilter}
          onSearch={handleSubmitSearch}
        />
      </section>

      {!hasSubmittedSearch && (
        <>
          <RecentSearches
            searches={recentSearches}
            onRemove={handleRemoveRecentSearch}
            onClear={() => setRecentSearches([])}
          />

          <section className='w-full px-5 py-4'>
            <div className='flex w-full flex-col gap-3'>
              <RankingToolbar
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
              />
              {message ? (
                <section className='flex min-h-32 w-full items-center justify-center rounded-2xl bg-white/50 px-5 py-8 typo-caption-2 text-neutral-800'>
                  {message}
                </section>
              ) : (
                <RankingSupplementList items={items} />
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
        </>
      )}
    </main>
  );
};

export default RankingPageContent;
