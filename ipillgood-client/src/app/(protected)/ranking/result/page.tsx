import { Suspense } from 'react';
import RankingResultContainer from '@/features/ranking/components/result/RankingResultContainer';
import RankingResultSkeletonCard from '@/features/ranking/components/result/RankingResultSkeletonCard';

const fallback = (
  <main className='flex min-h-dvh w-full flex-col gap-3 px-5 pb-24 pt-20'>
    {Array.from({ length: 4 }, (_, index) => (
      <RankingResultSkeletonCard key={index} />
    ))}
  </main>
);

const RankingResultPage = () => {
  return (
    <Suspense fallback={fallback}>
      <RankingResultContainer />
    </Suspense>
  );
};

export default RankingResultPage;
