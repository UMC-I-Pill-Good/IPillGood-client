import { axiosInstance } from '@/app/api/api';
import { ResponseDuePrompts, ResponseDuePromptsDismiss } from '../types/review-prompt';

export const getReviewPrompts = async (): Promise<ResponseDuePrompts> => {
  const { data } = await axiosInstance.get<ResponseDuePrompts>('/cabinet/review-prompts/due');

  return data;
};

export const patchReviewPromptsDismiss = async (
  activeProductId: number,
): Promise<ResponseDuePromptsDismiss> => {
  const { data } = await axiosInstance.patch<ResponseDuePromptsDismiss>(
    `/cabinet/review-prompts/${activeProductId}/dismissed`,
  );

  return data;
};
