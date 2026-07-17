'use client';

import { useEffect, useState } from 'react';
import { INITIAL_RECENT_SEARCHES } from '../constants/recentSearches';
import { getMockRanking } from '../services/rankingMockService';
import type { RankingItemDto, RankingUiSort } from '../types/ranking';
import RankingSearchBar from './RankingSearchBar';
import RankingSupplementList from './RankingSupplementList';
import RankingToolbar from './RankingToolbar';
import RecentSearches from './RecentSearches';

const RankingPageContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    ...INITIAL_RECENT_SEARCHES,
  ]);
  const [selectedSort, setSelectedSort] =
    useState<RankingUiSort>('REVIEW_COUNT');
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
        search: searchValue,
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
  }, [searchValue, selectedSort]);

  const handleRemoveRecentSearch = (searchTerm: string) => {
    setRecentSearches((prevSearches) =>
      prevSearches.filter((item) => item !== searchTerm),
    );
  };

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden pb-[98px]'>
      <section className='px-5 pb-4 pt-4'>
        <RankingSearchBar value={searchValue} onChange={setSearchValue} />
      </section>

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
            <section className='flex min-h-[123px] w-full items-center justify-center rounded-[20px] bg-white/50 px-5 py-8 typo-caption-2 text-neutral-800'>
              {message}
            </section>
          ) : (
            <RankingSupplementList items={items} />
          )}
        </div>
      </section>
    </main>
  );
};

export default RankingPageContent;
