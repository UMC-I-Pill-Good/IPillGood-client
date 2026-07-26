import type { CreateReviewApiResponse, CreateReviewRequest } from '../types/review';

export const createReview = async (
  request: CreateReviewRequest,
): Promise<CreateReviewApiResponse> => {
  // TODO: 후기 작성 API 연결 후 서버 응답으로 교체
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '후기 작성에 성공했습니다.',
    result: {
      reviewId: Date.now() + request.productId,
    },
  };
};
