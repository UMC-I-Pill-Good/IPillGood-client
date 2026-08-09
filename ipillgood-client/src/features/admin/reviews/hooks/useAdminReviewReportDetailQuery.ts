import { useQuery } from '@tanstack/react-query';

import { getAdminReviewReportDetail } from '../api/ReviewReport';

export const ADMIN_REVIEW_REPORT_DETAIL_QUERY_KEY = ['adminReviewReportDetail'] as const;

export const useAdminReviewReportDetailQuery = (reportId: number) => {
  return useQuery({
    queryKey: [...ADMIN_REVIEW_REPORT_DETAIL_QUERY_KEY, reportId],
    queryFn: () => getAdminReviewReportDetail(reportId),
  });
};
