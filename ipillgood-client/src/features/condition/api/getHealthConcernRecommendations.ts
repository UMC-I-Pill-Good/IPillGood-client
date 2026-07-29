import { axiosInstance } from '@/app/api/api';
import { type HealthConcernRecommendationsResponse } from '../types/healthStatus';

export interface GetHealthConcernRecommendationsParams {
  majorCategory: string;
  minorCategory: string;
}

/** GET /api/v1/health-concerns */
export const getHealthConcernRecommendations = async ({
  majorCategory,
  minorCategory,
}: GetHealthConcernRecommendationsParams): Promise<HealthConcernRecommendationsResponse> => {
  const response = await axiosInstance.get<HealthConcernRecommendationsResponse>(
    '/health-concerns',
    {
      params: {
        majorCategory,
        minorCategory,
      },
    },
  );
  return response.data;
};

