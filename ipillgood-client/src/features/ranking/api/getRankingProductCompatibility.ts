import { axiosInstance } from '@/app/api/api';
import type { RankingProductCompatibilityApiResponse } from '../types/ranking';

export const getRankingProductCompatibility = async (
  productId: number,
): Promise<RankingProductCompatibilityApiResponse> => {
  const { data } = await axiosInstance.get<RankingProductCompatibilityApiResponse>(
    `/products/${productId}/combinations`,
  );

  return data;
};
