import { axiosInstance } from '@/app/api/api';
import { ResponseRecommendationResult } from '../types/recommendation';

export const getRecommendation = async (
  recommendationId: number,
): Promise<ResponseRecommendationResult> => {
  const { data } = await axiosInstance.get<ResponseRecommendationResult>(
    `/recommendations/${recommendationId}`,
  );

  return data;
};
