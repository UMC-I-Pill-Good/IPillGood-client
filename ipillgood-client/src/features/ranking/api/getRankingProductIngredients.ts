import { getRankingProductDetail } from './getRankingProductDetail';
import type { RankingProductIngredientsApiResponse } from '../types/ranking';

/** 포함 성분 목록 API 응답 형태를 유지하는 조회 함수입니다. */
export const getRankingProductIngredients = async (
  productId: number,
): Promise<RankingProductIngredientsApiResponse> => {
  const response = await getRankingProductDetail(productId);

  if (!response.isSuccess || !response.result) {
    return {
      isSuccess: false,
      code: response.code,
      message: response.message,
      result: null,
    };
  }

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '포함 성분 목록 조회에 성공했습니다.',
    result: {
      productId: response.result.productId,
      ingredientCount: response.result.ingredients.length,
      ingredients: response.result.ingredients.map(({ adClaimRisk: _adClaimRisk, ...ingredient }) => ingredient),
    },
  };
};
