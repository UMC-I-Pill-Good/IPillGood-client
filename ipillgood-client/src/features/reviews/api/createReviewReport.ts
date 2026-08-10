import { axiosInstance } from '@/app/api/api';
import type { CreateReviewReportApiResponse, CreateReviewReportRequest } from '../types/review';

export const createReviewReport = async (
  reviewId: number,
  request: CreateReviewReportRequest,
): Promise<CreateReviewReportApiResponse> => {
  const { data } = await axiosInstance.post<CreateReviewReportApiResponse>(
    `/reviews/${reviewId}/reports`,
    request,
  );

  return data;
};
