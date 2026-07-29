import { axiosInstance } from '@/app/api/api';
import { type ConditionPopupDismissedResponse } from '../types/condition';

/** PATCH /api/v1/conditions/popup-logs/current-week/dismissed */
export const patchConditionPopupDismissed = async (): Promise<ConditionPopupDismissedResponse> => {
  const response = await axiosInstance.patch<ConditionPopupDismissedResponse>(
    '/conditions/popup-logs/current-week/dismissed',
  );
  return response.data;
};

