import { axiosInstance } from '@/app/api/api';
import type { CommonResponse } from '@/shared/types/api';

import type {
  ProcessReviewReportRequestType,
  ProcessReviewReportResultType,
  ReviewReportDetailResultType,
  ReviewReportListParamsType,
  ReviewReportListResultType,
} from '../types/ReviewReport';

const getValidatedResponse = <T>(response: CommonResponse<T>) => {
  if (!response.isSuccess) {
    throw new Error(response.message);
  }

  return response;
};

export const getAdminReviewReportList = async (params: ReviewReportListParamsType) => {
  const { data } = await axiosInstance.get<CommonResponse<ReviewReportListResultType>>(
    '/admin/review-reports',
    { params },
  );

  return getValidatedResponse(data);
};

export const getAdminReviewReportDetail = async (reportId: number) => {
  const { data } = await axiosInstance.get<CommonResponse<ReviewReportDetailResultType>>(
    `/admin/review-reports/${reportId}`,
  );

  return getValidatedResponse(data);
};

export const processAdminReviewReport = async (
  reportId: number,
  body: ProcessReviewReportRequestType,
) => {
  const { data } = await axiosInstance.patch<CommonResponse<ProcessReviewReportResultType>>(
    `/admin/review-reports/${reportId}`,
    body,
  );

  return getValidatedResponse(data);
};
