import { axiosInstance } from '@/app/api/api';
import { getAdminFaqList } from '@/features/admin/faq/api/Faq';
import type { CommonResponse } from '@/shared/types/api';

import type { DashboardReviewReportListResultType } from '../types/Dashboard';

const DASHBOARD_PAGE_SIZE = 6;

export const getDashboardFaqList = (page: number) => {
  return getAdminFaqList({ page, size: DASHBOARD_PAGE_SIZE });
};

export const getDashboardReviewList = async (page: number) => {
  const { data } = await axiosInstance.get<CommonResponse<DashboardReviewReportListResultType>>(
    '/admin/review-reports',
    {
      params: {
        page,
        size: DASHBOARD_PAGE_SIZE,
      },
    },
  );

  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data;
};
