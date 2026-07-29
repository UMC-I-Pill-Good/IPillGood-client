import { axiosInstance } from '@/app/api/api';
import { type HealthConcernCategoriesResponse } from '../types/healthStatus';

/** GET /api/v1/health-concerns/categories */
export const getHealthConcernCategories = async (): Promise<HealthConcernCategoriesResponse> => {
  const response = await axiosInstance.get<HealthConcernCategoriesResponse>(
    '/health-concerns/categories',
  );
  return response.data;
};
