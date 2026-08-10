import { axiosInstance } from '@/app/api/api';
import type { UpdateRankingReviewApiResponse, UpdateRankingReviewRequest } from '../types/review';

export const updateReview = async (
  reviewId: number,
  request: UpdateRankingReviewRequest,
): Promise<UpdateRankingReviewApiResponse> => {
  const { data: updateResponse } = await axiosInstance.patch<UpdateRankingReviewApiResponse>(
    `/reviews/${reviewId}`,
    request,
  );
  if (!updateResponse.isSuccess || !updateResponse.result) {
    throw new Error(updateResponse.message || '후기를 수정할 수 없습니다.');
  }

  return updateResponse;
};
