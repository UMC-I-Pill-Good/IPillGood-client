import { useQuery } from '@tanstack/react-query';

import { getRankingProductCompatibility } from '../api/getRankingProductCompatibility';
import { getRankingProductDetail } from '../api/getRankingProductDetail';
import { getRankingProductIngredients } from '../api/getRankingProductIngredients';
import { rankingQueryKeys } from '../constants/rankingQueryKeys';

export const useRankingProductDetail = (productId: number) =>
  useQuery({
    queryKey: rankingQueryKeys.productDetail(productId),
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
