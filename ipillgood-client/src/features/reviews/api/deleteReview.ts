import { axiosInstance } from '@/app/api/api';
import type { DeleteReviewApiResponse } from '../types/review';

export const deleteReview = async (reviewId: number): Promise<DeleteReviewApiResponse> => {
  const { data } = await axiosInstance.delete<DeleteReviewApiResponse>(`/reviews/${reviewId}`);

  return data;
};
