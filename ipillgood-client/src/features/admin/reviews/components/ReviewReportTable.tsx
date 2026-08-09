import { AdminTable, TextButton } from '@/shared/components';
import type { AdminTableColumn } from '@/shared/components';

import type { ReportedReviewType } from '../types/ReviewReport';

const getReportedReviewColumnList = (
  onViewReview: (review: ReportedReviewType) => void,
): readonly AdminTableColumn<ReportedReviewType>[] => [
  {
    key: 'id',
    header: '번호',
    width: 57,
    render: (review) => review.id,
  },
  {
    key: 'content',
    header: '후기 내용',
    width: 252,
    truncate: true,
    render: (review) => review.content,
  },
  {
    key: 'reason',
    header: '신고 사유',
    width: 169,
    render: (review) => review.reason,
  },
  {
    key: 'reportedAt',
    header: '신고일',
    width: 152,
    render: (review) => review.reportedAt,
  },
  {
    key: 'status',
    header: '상태',
    width: 132,
    render: (review) => <span className='text-semantic'>{review.status}</span>,
  },
  {
    key: 'action',
    header: '관리',
    width: 75,
    align: 'center',
    render: (review) => (
      <TextButton
        text='보기'
        variant='secondary'
        size='sm'
        onClick={() => onViewReview(review)}
        className='h-auto px-4 py-1 text-sm! leading-none! shadow-none'
      />
    ),
  },
];

interface ReviewReportTableProps {
  reviewList: readonly ReportedReviewType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewReview: (review: ReportedReviewType) => void;
}

const ReviewReportTable = ({
  reviewList,
  currentPage,
  totalPages,
  onPageChange,
  onViewReview,
}: ReviewReportTableProps) => {
  return (
    <AdminTable
      columns={getReportedReviewColumnList(onViewReview)}
      data={reviewList}
      getRowKey={(review) => review.id}
      minRows={10}
      tableMinWidth={1031}
      ariaLabel='신고된 후기 목록'
      pagination={{ currentPage, totalPages, onPageChange }}
    />
  );
};

export default ReviewReportTable;
