import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getAdminReviewReportList } from '../api/ReviewReport';
import type { ReviewReportListParamsType } from '../types/ReviewReport';

export const ADMIN_REVIEW_REPORT_LIST_QUERY_KEY = ['adminReviewReportList'] as const;

export const useAdminReviewReportListQuery = (params: ReviewReportListParamsType) => {
  return useQuery({
    queryKey: [...ADMIN_REVIEW_REPORT_LIST_QUERY_KEY, params],
    queryFn: () => getAdminReviewReportList(params),
    placeholderData: keepPreviousData,
  });
};
