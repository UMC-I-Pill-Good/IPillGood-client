import { axiosInstance } from '@/app/api/api';
import {
  type ConditionCheckRequest,
  type ConditionCheckResponse,
} from '../types/condition';

/** POST /api/v1/conditions/weekly-records */
export const postConditionCheck = async (
  data: ConditionCheckRequest,
): Promise<ConditionCheckResponse> => {
  const response = await axiosInstance.post<ConditionCheckResponse>(
    '/conditions/weekly-records',
    data,
  );
  return response.data;
};

