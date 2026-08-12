import { axiosInstance } from '@/app/api/api';
import type { CreateReviewApiResponse, CreateReviewRequest } from '../types/review';
import { ReviewApiError } from '../utils/reviewError';

export const createReview = async (
  request: CreateReviewRequest,
): Promise<CreateReviewApiResponse> => {
  const { productId, ...body } = request;
  const { data: createResponse } = await axiosInstance.post<CreateReviewApiResponse>(
    `/reviews/${productId}`,
    body,
  );
  if (!createResponse.isSuccess || !createResponse.result) {
    throw new ReviewApiError(
      createResponse.code,
      createResponse.message || '후기를 작성할 수 없습니다.',
    );
  }

  return createResponse;
};
