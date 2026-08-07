import { axiosInstance } from '@/app/api/api';
import type { RankingProductIngredientsApiResponse } from '../types/ranking';

export const getRankingProductIngredients = async (
  productId: number,
): Promise<RankingProductIngredientsApiResponse> => {
  const { data } = await axiosInstance.get<RankingProductIngredientsApiResponse>(
    `/products/${productId}/ingredients`,
  );

  return data;
};
