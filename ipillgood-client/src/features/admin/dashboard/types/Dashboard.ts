export type DashboardTableType = 'reviews' | 'faq';

export type DashboardReviewItemType = {
  id: number;
  content: string;
  reason: string;
  reportedAt: string;
  status: string;
};

export type DashboardFaqItemType = {
  id: number;
  title: string;
  createdAt: string;
};

export type DashboardReviewReportApiItemType = {
  reportId: number;
  reviewContent: string;
  reason: {
    type: string;
    label: string;
  };
  reportedAt: string;
  status: {
    type: string;
    label: string;
  };
};

export type DashboardReviewReportListResultType = {
  reports: DashboardReviewReportApiItemType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
