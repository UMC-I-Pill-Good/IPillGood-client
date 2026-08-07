import { axiosInstance } from '@/app/api/api';
import type { CreateReviewApiResponse, CreateReviewRequest } from '../types/review';

export const createReview = async (
  request: CreateReviewRequest,
): Promise<CreateReviewApiResponse> => {
  const { productId, ...body } = request;
  const { data: createResponse } = await axiosInstance.post<CreateReviewApiResponse>(
    `/reviews/${productId}`,
    body,
  );
  if (!createResponse.isSuccess || !createResponse.result) {
    throw new Error(createResponse.message || '후기를 작성할 수 없습니다.');
  }

  return createResponse;
};
