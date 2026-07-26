import type {
  UpdateRankingReviewApiResponse,
  UpdateRankingReviewRequest,
} from '../types/review';

export const updateReview = async (
  reviewId: number,
  request: UpdateRankingReviewRequest,
): Promise<UpdateRankingReviewApiResponse> => {
  const response = await fetch(`/api/v1/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('후기를 수정할 수 없습니다.');
  }

  const updateResponse = (await response.json()) as UpdateRankingReviewApiResponse;
  if (!updateResponse.isSuccess || !updateResponse.result) {
    throw new Error(updateResponse.message || '후기를 수정할 수 없습니다.');
  }

  return updateResponse;
};
