'use client';

import { useQuery } from '@tanstack/react-query';
import { FetchError, LoadingSpinner } from '@/shared/components';
import { Header } from '@/shared/layout';
import { getRankingProductCompatibility } from '../../api/getRankingProductCompatibility';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import { getRankingProductIngredients } from '../../api/getRankingProductIngredients';
import RankingProductDetail from './RankingProductDetail';

interface RankingProductDetailContainerProps {
  productId: number;
}

const RankingProductDetailContainer = ({ productId }: RankingProductDetailContainerProps) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['ranking-product-detail', productId],
    queryFn: async () => {
      const [detailResponse, ingredientResponse, compatibilityResponse] = await Promise.all([
        getRankingProductDetail(productId),
        getRankingProductIngredients(productId),
        getRankingProductCompatibility(productId),
      ]);

      if (
        !detailResponse.isSuccess ||
        !detailResponse.result ||
        !ingredientResponse.isSuccess ||
        !ingredientResponse.result ||
        !compatibilityResponse.isSuccess ||
        !compatibilityResponse.result
      ) {
        throw new Error(
          detailResponse.message || ingredientResponse.message || compatibilityResponse.message,
        );
      }

      return {
        product: detailResponse.result,
        ingredients: ingredientResponse.result.ingredientInfos,
        compatibility: compatibilityResponse.result,
      };
    },
  });

  return (
    <main className='min-h-dvh overflow-x-hidden bg-background pb-16'>
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
