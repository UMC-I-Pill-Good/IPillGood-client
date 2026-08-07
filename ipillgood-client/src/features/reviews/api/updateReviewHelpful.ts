import { axiosInstance } from '@/app/api/api';
import type { ReviewHelpfulApiResponse } from '../types/review';

export const updateReviewHelpful = async (
  reviewId: number,
  isHelpful: boolean,
): Promise<ReviewHelpfulApiResponse> => {
  const { data } = isHelpful
    ? await axiosInstance.delete<ReviewHelpfulApiResponse>(`/reviews/${reviewId}/helpful`)
    : await axiosInstance.post<ReviewHelpfulApiResponse>(`/reviews/${reviewId}/helpful`);

  return data;
};
