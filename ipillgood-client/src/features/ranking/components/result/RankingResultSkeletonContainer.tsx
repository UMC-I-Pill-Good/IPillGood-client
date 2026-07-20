'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SearchBar, TextButton } from '@/shared/components';
import RankingResultSkeletonCard from './RankingResultSkeletonCard';

const INITIAL_SKELETON_CARD_COUNT = 4;
const SKELETON_CARD_LOAD_COUNT = 4;

const RankingResultSkeletonContainer = () => {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [skeletonCardCount, setSkeletonCardCount] = useState(
    INITIAL_SKELETON_CARD_COUNT,
  );
  const isLoading = true;

  useEffect(() => {
    if (!isLoading) return;

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
  }, [isLoading]);

  return (
    <main className='flex min-h-dvh w-full flex-col overflow-x-hidden px-5 pb-24 pt-4'>
      <section className='flex w-full items-center gap-3'>
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder='브랜드, 영양 성분을 검색해 보세요.'
          className='h-12 flex-1 rounded-2xl bg-white px-3 py-3 text-primary-600 shadow-none backdrop-blur-none'
          inputClassName='min-w-0 px-1 typo-body-11 placeholder:text-neutral-800'
          searchIconClassName='size-5'
          searchIconSize={20}
        />
        <TextButton
          type='button'
          text='취소'
          size='sm'
          variant='assistive'
          className='h-8 shrink-0 rounded-full bg-white/70 px-3 text-primary-500'
          onClick={() => router.push('/ranking')}
        />
      </section>

      <section
        className='mt-8 flex w-full flex-col gap-3'
        aria-label='검색 결과를 불러오는 중'
        aria-busy='true'
      >
        {Array.from({ length: skeletonCardCount }, (_, index) => (
          <RankingResultSkeletonCard key={index} />
        ))}
        {isLoading && <div ref={loadMoreRef} className='h-px w-full' />}
      </section>
    </main>
  );
};

export default RankingResultSkeletonContainer;
