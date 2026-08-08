import { axiosInstance } from '@/app/api/api';
import type { MyReviewApiResponse, MyReviewResult } from '../types/review';

export const getReviewById = async (reviewId: number): Promise<MyReviewResult | null> => {
  const { data } = await axiosInstance.get<MyReviewApiResponse>(`/reviews/me/${reviewId}`);

  if (!data.isSuccess || !data.result) return null;
  if (data.result.imageKeys.length !== data.result.imageUrls.length) {
    throw new Error('후기 이미지 표시 정보를 불러올 수 없습니다.');
  }

  return data.result;
};
