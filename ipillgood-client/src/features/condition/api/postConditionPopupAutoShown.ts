import { axiosInstance } from '@/app/api/api';
import { type ConditionPopupAutoShownResponse } from '../types/condition';

/** PATCH /api/v1/conditions/popup-logs/auto-shown */
export const postConditionPopupAutoShown = async (): Promise<ConditionPopupAutoShownResponse> => {
  const response = await axiosInstance.patch<ConditionPopupAutoShownResponse>(
    '/conditions/popup-logs/auto-shown',
  );
  return response.data;
};

