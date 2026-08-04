import { axiosInstance } from '@/app/api/api';
import { ResponseDuePrompts, ResponseDuePromptsDismiss } from '../types/review-prompt';

export const getReviewPrompts = async (): Promise<ResponseDuePrompts> => {
  const { data } = await axiosInstance.get<ResponseDuePrompts>('/cabinet/reveiw-prompts/due');

  return data;
};

export const patchReviewPromptsDismiss = async (
  activeProductId: number,
): Promise<ResponseDuePromptsDismiss> => {
  const { data } = await axiosInstance.patch<ResponseDuePromptsDismiss>(
    `/cabinet/reveiw-prompts/${activeProductId}/dismissed`,
  );

  return data;
};
