import { axiosInstance } from '@/app/api/api';
import { type ConditionWeekDetailResponse } from '../types/condition';

/** GET /api/v1/conditions/weekly-records/{recordId} */
export const getConditionWeekDetail = async (
  recordId: number,
): Promise<ConditionWeekDetailResponse> => {
  const response = await axiosInstance.get<ConditionWeekDetailResponse>(
    `/conditions/weekly-records/${recordId}`,
  );
  return response.data;
};

