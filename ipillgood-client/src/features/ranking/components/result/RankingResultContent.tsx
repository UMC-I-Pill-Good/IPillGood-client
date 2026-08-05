'use client';

import { useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { FilterIcon } from '@/assets';
import { FetchError } from '@/shared/components';
import type { ProductSearchItemDto, RankingUiSort } from '../../types/ranking';
import RankingSupplementList from '../default/RankingSupplementList';
import SortDropdownTrigger from '../default/SortDropdownTrigger';
import RankingResultEmptyState from './RankingResultEmptyState';
import RankingResultSkeletonCard from './RankingResultSkeletonCard';

const SKELETON_CARD_LOAD_COUNT = 4;
const MAX_SKELETON_CARD_COUNT = 12;
const LOAD_MORE_SKELETON_CARD_COUNT = 2;

type RankingResultContentData = {
  viewState: 'loading' | 'success' | 'emptySearch' | 'emptyFilter' | 'error';
  activeFilterCount: number;
  items: ProductSearchItemDto[];
  totalElements: number;
  message: string | null;
  selectedSort: RankingUiSort;
  skeletonCardCount: number;
  hasNext: boolean;
  isLoadingMore: boolean;
};

type RankingResultContentHandlers = {
  onOpenFilter: () => void;
  onSortChange: (sort: RankingUiSort) => void;
  onLoadMore: () => void;
  onRetry: () => void;
  setSkeletonCardCount: Dispatch<SetStateAction<number>>;
};

interface RankingResultContentProps {
  data: RankingResultContentData;
  handlers: RankingResultContentHandlers;
}

const RankingResultContent = ({
  data: {
    viewState,
    activeFilterCount,
    items,
    totalElements,
    message,
    selectedSort,
    skeletonCardCount,
    hasNext,
    isLoadingMore,
  },
  handlers: { onOpenFilter, onSortChange, onLoadMore, onRetry, setSkeletonCardCount },
}: RankingResultContentProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (viewState !== 'loading' || !target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSkeletonCardCount((count) =>
            Math.min(count + SKELETON_CARD_LOAD_COUNT, MAX_SKELETON_CARD_COUNT),
          );
        }
      },
      { rootMargin: '160px 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [setSkeletonCardCount, viewState]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!hasNext || viewState === 'loading' || viewState === 'error' || isLoadingMore || !target)
      return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && onLoadMore(), {
      rootMargin: '160px 0px',
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNext, isLoadingMore, onLoadMore, viewState]);

  if (viewState === 'loading') {
    return (
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
    );
  }

  return (
    <>
      {viewState === 'emptyFilter' && (
        <button
          type='button'
          aria-label={`필터 ${activeFilterCount}개 수정하기`}
          className='mt-5 inline-flex w-fit items-center gap-1 rounded-lg border border-primary-600 bg-primary-200 px-3 py-2 typo-body-10 text-black'
          onClick={onOpenFilter}
        >
          <FilterIcon aria-hidden='true' className='size-5 text-primary-600' />
          <span>필터</span>
          <span className='flex size-6 items-center justify-center rounded-full bg-primary-500 text-white'>
            {activeFilterCount}
          </span>
        </button>
      )}

      <section className='mt-6 flex w-full flex-col gap-2'>
        {viewState !== 'error' && (
          <div className='flex w-full items-center justify-between gap-3'>
            <div className='flex min-w-0 items-end gap-1'>
              <h1 className='typo-body-5 text-black'>검색 결과</h1>
              <span className='pb-0.5 typo-caption-7 text-neutral-800'>{totalElements}개</span>
            </div>
            <SortDropdownTrigger selectedSort={selectedSort} onSortChange={onSortChange} />
          </div>
        )}

        {viewState === 'error' ? (
          <FetchError
            description={message ?? '검색 결과를 불러오지 못했습니다.'}
            onRetry={onRetry}
          />
        ) : (
          <RankingSupplementList
            items={items}
            emptyState={
              <RankingResultEmptyState
                message={
                  viewState === 'emptyFilter'
                    ? '해당 조건에 맞는 영양제가 없어요...'
                    : '검색 결과가 존재하지 않아요...'
                }
              />
            }
          />
        )}
        {isLoadingMore && (
          <section
            className='flex w-full flex-col gap-3'
            aria-label='검색 결과를 추가로 불러오는 중'
            aria-busy='true'
          >
            {Array.from({ length: LOAD_MORE_SKELETON_CARD_COUNT }, (_, index) => (
              <RankingResultSkeletonCard key={index} />
            ))}
          </section>
        )}
        <div ref={loadMoreRef} className='h-px w-full' />
      </section>
    </>
  );
};

export default RankingResultContent;
