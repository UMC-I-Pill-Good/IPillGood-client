import { axiosInstance } from '@/app/api/api';
import type { RankingProductDetailApiResponse } from '../types/ranking';

export const getRankingProductDetail = async (
  productId: number,
): Promise<RankingProductDetailApiResponse> => {
  const { data } = await axiosInstance.get<RankingProductDetailApiResponse>(
    `/products/${productId}`,
  );

  return data;
};
