import { AdminTable } from '@/shared/components';
import type { AdminTableColumn } from '@/shared/components';

import type { FaqItemType } from '../types/Faq';
import FaqTableActions from './FaqTableActions';

const getFaqTableColumnList = (
  onEdit: (faq: FaqItemType) => void,
  onDelete: (faq: FaqItemType) => void,
): readonly AdminTableColumn<FaqItemType>[] => [
  {
    key: 'id',
    header: '번호',
    render: (faq) => faq.id,
    width: '9%',
  },
  {
    key: 'question',
    header: '질문',
    render: (faq) => faq.question,
    width: '28%',
    truncate: true,
  },
  {
    key: 'answer',
    header: '답변',
    render: (faq) => faq.answer,
    width: '22%',
    truncate: true,
  },
  {
    key: 'category',
    header: '카테고리',
    render: (faq) => faq.category,
    width: '15%',
  },
  {
    key: 'updatedAt',
    header: '수정일',
    render: (faq) => faq.updatedAt,
    width: '18%',
  },
  {
    key: 'actions',
    header: '관리',
    render: (faq) => <FaqTableActions faq={faq} onEdit={onEdit} onDelete={onDelete} />,
    width: '8%',
  },
];

interface FaqTableProps {
  faqList: FaqItemType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEdit: (faq: FaqItemType) => void;
  onDelete: (faq: FaqItemType) => void;
}

const FaqTable = ({
  faqList,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete,
}: FaqTableProps) => {
  return (
    <AdminTable
      columns={getFaqTableColumnList(onEdit, onDelete)}
      data={faqList}
      getRowKey={(faq) => faq.id}
      minRows={11}
      tableMinWidth={1031}
      ariaLabel='FAQ 목록'
      pagination={{
        currentPage,
        totalPages,
        onPageChange,
        className: 'mt-2',
      }}
    />
  );
};

export default FaqTable;
