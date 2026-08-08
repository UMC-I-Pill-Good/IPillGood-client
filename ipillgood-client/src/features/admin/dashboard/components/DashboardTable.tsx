import { AdminTable } from '@/shared/components';
import type { AdminTableColumn } from '@/shared/components';

import { DASHBOARD_FAQ_LIST, DASHBOARD_REVIEW_LIST } from '../constants/DashboardList';
import type {
  DashboardFaqItemType,
  DashboardReviewItemType,
  DashboardTableType,
} from '../types/Dashboard';

const DASHBOARD_REVIEW_COLUMN_LIST: readonly AdminTableColumn<DashboardReviewItemType>[] = [
  { key: 'id', header: '번호', render: (review) => review.id, width: '9%' },
  {
    key: 'content',
    header: '후기 내용',
    render: (review) => review.content,
    width: '48%',
    truncate: true,
  },
  { key: 'reason', header: '신고사유', render: (review) => review.reason, width: '17%' },
  { key: 'reportedAt', header: '신고일', render: (review) => review.reportedAt, width: '17%' },
  {
    key: 'status',
    header: '상태',
    render: (review) => <span className='text-semantic-500'>{review.status}</span>,
    width: '9%',
  },
];

const DASHBOARD_FAQ_COLUMN_LIST: readonly AdminTableColumn<DashboardFaqItemType>[] = [
  { key: 'id', header: '번호', render: (faq) => faq.id, width: '9%' },
  { key: 'title', header: '제목', render: (faq) => faq.title, width: '64%', truncate: true },
  { key: 'createdAt', header: '등록일', render: (faq) => faq.createdAt, width: '27%' },
];

interface DashboardTableProps {
  tableType: DashboardTableType;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DashboardTable = ({
  tableType,
  currentPage,
  totalPages,
  onPageChange,
}: DashboardTableProps) => {
  const pagination = { currentPage, totalPages, onPageChange, className: 'mt-2' };

  if (tableType === 'reviews') {
    return (
      <AdminTable
        columns={DASHBOARD_REVIEW_COLUMN_LIST}
        data={DASHBOARD_REVIEW_LIST}
        getRowKey={(review) => review.id}
        minRows={6}
        tableMinWidth={1031}
        pagination={pagination}
        ariaLabel='최근 신고된 후기 목록'
        className='px-10'
      />
    );
  }

  return (
    <AdminTable
      columns={DASHBOARD_FAQ_COLUMN_LIST}
      data={DASHBOARD_FAQ_LIST}
      getRowKey={(faq) => faq.id}
      minRows={6}
      tableMinWidth={1031}
      pagination={pagination}
      ariaLabel='최근 신고된 FAQ 목록'
      className='px-10'
    />
  );
};

export default DashboardTable;
