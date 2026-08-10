import { axiosInstance } from '@/app/api/api';
import type { RankingReviewApiResponse, RankingReviewQuery } from '../types/review';

export const getProductReviews = async ({
  productId,
  sort = 'LATEST',
  size = 20,
  cursor,
}: RankingReviewQuery): Promise<RankingReviewApiResponse> => {
  const { data } = await axiosInstance.get<RankingReviewApiResponse>(`/reviews/${productId}`, {
    params: { sort, size, cursor },
  });

  return data;
};
