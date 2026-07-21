import { Suspense } from 'react';
import RankingResultContainer from '@/features/ranking/components/result/RankingResultContainer';

const RankingResultPage = () => {
  return (
    <Suspense>
      <RankingResultContainer />
    </Suspense>
  );
};

export default RankingResultPage;
