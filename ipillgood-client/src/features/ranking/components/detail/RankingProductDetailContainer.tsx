'use client';

import { FetchError, LoadingSpinner } from '@/shared/components';
import { Header } from '@/shared/layout';
import { useRankingProductDetail } from '../../hooks/useRankingProductDetail';
import RankingProductDetail from './RankingProductDetail';

interface RankingProductDetailContainerProps {
  productId: number;
}

const RankingProductDetailContainer = ({ productId }: RankingProductDetailContainerProps) => {
  const { data, isPending, isError, refetch } = useRankingProductDetail(productId);

  return (
    <main className='min-h-dvh overflow-x-hidden bg-background pb-24'>
      <Header title='영양제 더보기' />
      {isPending && <LoadingSpinner />}
      {isError && (
        <FetchError
          description='영양제 상세 정보를 불러오지 못했습니다.'
          onRetry={() => refetch()}
        />
      )}
      {data && <RankingProductDetail {...data} />}
    </main>
  );
};

export default RankingProductDetailContainer;
