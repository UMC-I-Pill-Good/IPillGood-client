import { useMutation, useQueryClient } from '@tanstack/react-query';

import { processAdminReviewReport } from '../api/ReviewReport';
import type { ProcessReviewReportRequestType } from '../types/ReviewReport';
import { ADMIN_REVIEW_REPORT_DETAIL_QUERY_KEY } from './useAdminReviewReportDetailQuery';
import { ADMIN_REVIEW_REPORT_LIST_QUERY_KEY } from './useAdminReviewReportListQuery';

type ProcessAdminReviewReportParamsType = {
  reportId: number;
  body: ProcessReviewReportRequestType;
};

export const useAdminReviewReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, body }: ProcessAdminReviewReportParamsType) =>
      processAdminReviewReport(reportId, body),
    onSuccess: (_response, { reportId }) => {
      void queryClient.invalidateQueries({ queryKey: ADMIN_REVIEW_REPORT_LIST_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...ADMIN_REVIEW_REPORT_DETAIL_QUERY_KEY, reportId],
      });
    },
  });
};
