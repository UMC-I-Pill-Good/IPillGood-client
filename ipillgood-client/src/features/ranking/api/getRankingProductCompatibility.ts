import { getRankingProductDetail } from './getRankingProductDetail';
import type { RankingProductCompatibilityApiResponse } from '../types/ranking';

export const getRankingProductCompatibility = async (
  productId: number,
): Promise<RankingProductCompatibilityApiResponse> => {
  const response = await getRankingProductDetail(productId);
  if (!response.isSuccess || !response.result) {
    return { isSuccess: false, code: response.code, message: response.message, result: null };
  }
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '내 캐비닛 기준 성분 궁합 조회에 성공했습니다.',
    result: {
      productId: response.result.productId,
      ownedProductCount: response.result.inCabinet ? 1 : 0,
      goodCombinations: response.result.ingredients.filter((item) => !item.adClaimRisk).map((item) => ({
        targetIngredientId: item.ingredientId,
        targetIngredientName: item.name,
        type: 'GOOD' as const,
      })),
      cautionCombinations: response.result.adClaimRiskIngredients.map((item) => ({
        targetIngredientId: item.ingredientId,
        targetIngredientName: item.name,
        type: 'CAUTION' as const,
      })),
    },
  };
};
