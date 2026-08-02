import { axiosInstance } from '@/app/api/api';
import { ResponseRecommendationResult, ResponseRecommendationRetry } from '../types/recommendation';

export const getRecommendation = async (
  recommendationId: number,
): Promise<ResponseRecommendationResult> => {
  const { data } = await axiosInstance.get<ResponseRecommendationResult>(
    `/recommendations/${recommendationId}`,
  );

  return data;
};

export const postRecommendationRetry = async (
  recommendationId: number,
): Promise<ResponseRecommendationRetry> => {
  const { data } = await axiosInstance.post<ResponseRecommendationRetry>(
    `/recommendations/${recommendationId}/retry`,
  );

  return data;
};
