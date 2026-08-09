export type ReportStatusFilterType = 'ALL' | 'PENDING' | 'COMPLETED';

export type ReportedReviewStatusType = 'PENDING' | 'DELETED' | 'MAINTAINED' | 'HIDDEN';

export type ProcessableReviewStatusType = Exclude<ReportedReviewStatusType, 'PENDING'>;

export type ReviewReportOptionType<T extends string = string> = {
  type: T;
  label: string;
};

export type ReportedReviewType = {
  id: number;
  content: string;
  reason: string;
  reportedAt: string;
  status: string;
};

export type ReviewReportListParamsType = {
  keyword?: string;
  status: ReportStatusFilterType;
  page: number;
  size: number;
};

export type ReviewReportApiItemType = {
  reportId: number;
  reviewContent: string;
  reason: ReviewReportOptionType;
  reportedAt: string;
  status: ReviewReportOptionType<ReportedReviewStatusType>;
};

export type ReviewReportListResultType = {
  reports: ReviewReportApiItemType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type ReviewReportDetailResultType = {
  reportId: number;
  reason: ReviewReportOptionType;
  writer: {
    nickname: string;
    username: string;
  };
  writtenAt: string;
  content: string;
  status: ReviewReportOptionType<ReportedReviewStatusType>;
  processReason: string | null;
};

export type ProcessReviewReportRequestType = {
  status: ProcessableReviewStatusType;
  processReason?: string;
};

export type ProcessReviewReportResultType = {
  reportId: number;
  status: ReviewReportOptionType<ProcessableReviewStatusType>;
  processReason: string | null;
  processedAt: string;
};
