import { axiosInstance } from '@/app/api/api';
import { type ConditionMonthlyRecordsResponse } from '../types/condition';

/** GET /api/v1/conditions/monthly-records */
export const getConditionSummary = async (
  year: number,
  month: number,
): Promise<ConditionMonthlyRecordsResponse> => {
  const response = await axiosInstance.get<ConditionMonthlyRecordsResponse>(
    '/conditions/monthly-records',
    {
      params: {
        year: year.toString(),
        month: month.toString(),
      },
    },
  );
  return response.data;
};

