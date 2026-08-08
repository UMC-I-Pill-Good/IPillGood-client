import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getDashboardFaqList, getDashboardReviewList } from '../api/Dashboard';
import type {
  DashboardFaqItemType,
  DashboardReviewItemType,
  DashboardTableType,
} from '../types/Dashboard';

type DashboardListDataType = {
  reviewList: DashboardReviewItemType[];
  faqList: DashboardFaqItemType[];
  totalPages: number;
};

const getDashboardList = async (
  tableType: DashboardTableType,
  currentPage: number,
): Promise<DashboardListDataType> => {
  const apiPage = currentPage - 1;

  if (tableType === 'reviews') {
    const response = await getDashboardReviewList(apiPage);

    return {
      reviewList: response.result.reports.map((review) => ({
        id: review.reportId,
        content: review.reviewContent,
        reason: review.reason.label,
        reportedAt: review.reportedAt.slice(0, 10),
        status: review.status.label,
      })),
      faqList: [],
      totalPages: response.result.totalPages,
    };
  }

  const response = await getDashboardFaqList(apiPage);

  return {
    reviewList: [],
    faqList: response.result.faqs.map((faq) => ({
      id: faq.faqId,
      title: faq.question,
      createdAt: faq.updatedAt.slice(0, 10),
    })),
    totalPages: response.result.totalPages,
  };
};

export const useDashboardListQuery = (tableType: DashboardTableType, currentPage: number) => {
  return useQuery({
    queryKey: ['adminDashboard', tableType, currentPage],
    queryFn: () => getDashboardList(tableType, currentPage),
    placeholderData: keepPreviousData,
  });
};
