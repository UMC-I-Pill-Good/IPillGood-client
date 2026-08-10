import { axiosInstance } from '@/app/api/api';
import { type ConditionCurrentWeekResponse } from '../types/condition';

/** GET /api/v1/conditions/current-week */
export const getConditionCurrentWeek = async (): Promise<ConditionCurrentWeekResponse> => {
  const response = await axiosInstance.get<ConditionCurrentWeekResponse>(
    '/conditions/current-week',
  );
  return response.data;
};

