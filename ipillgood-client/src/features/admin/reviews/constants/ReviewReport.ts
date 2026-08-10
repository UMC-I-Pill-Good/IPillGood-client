import type { ReportStatusFilterType, ReportedReviewStatusType } from '../types/ReviewReport';

export const REVIEW_REPORT_PAGE_SIZE = 10;

export const REPORT_STATUS_FILTER_LIST: readonly {
  value: ReportStatusFilterType;
  label: string;
}[] = [
  { value: 'ALL', label: '전체' },
  { value: 'PENDING', label: '처리 대기' },
  { value: 'COMPLETED', label: '처리 완료' },
];

export const REVIEW_REPORT_STATUS_LABEL_MAP: Record<ReportedReviewStatusType, string> = {
  PENDING: '처리 대기',
  DELETED: '삭제 처리',
  MAINTAINED: '유지 처리',
  HIDDEN: '숨김 처리',
};
