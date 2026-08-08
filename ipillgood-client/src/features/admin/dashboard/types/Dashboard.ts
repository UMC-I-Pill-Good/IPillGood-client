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
