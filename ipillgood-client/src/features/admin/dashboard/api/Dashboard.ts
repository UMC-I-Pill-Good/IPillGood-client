import { axiosInstance } from '@/app/api/api';
import type { CommonResponse } from '@/shared/types/api';

import type {
  DashboardFaqListResultType,
  DashboardReviewReportListResultType,
} from '../types/Dashboard';

const DASHBOARD_PAGE_SIZE = 6;

export const getDashboardFaqList = async (page: number) => {
  const { data } = await axiosInstance.get<CommonResponse<DashboardFaqListResultType>>(
    '/admin/faqs',
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
