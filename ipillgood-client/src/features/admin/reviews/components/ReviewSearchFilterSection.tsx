import { AdminSearchBar } from '@/shared/components';

import type { ReportStatusFilterType } from '../types/ReviewReport';
import ReviewStatusFilter from './ReviewStatusFilter';

interface ReviewSearchFilterSectionProps {
  searchValue: string;
  selectedStatus: ReportStatusFilterType;
  onSearchValueChange: (value: string) => void;
  onSearch: (value: string) => void;
  onStatusChange: (value: ReportStatusFilterType) => void;
}

const ReviewSearchFilterSection = ({
  searchValue,
  selectedStatus,
  onSearchValueChange,
  onSearch,
  onStatusChange,
}: ReviewSearchFilterSectionProps) => {
  return (
    <section
      aria-label='후기 신고 검색 및 필터'
      className='flex items-center justify-between gap-6 px-10 pb-4 pt-8'
    >
      <div className='min-w-0 basis-[551px]'>
        <AdminSearchBar
          value={searchValue}
          onChange={onSearchValueChange}
          onSearch={onSearch}
          placeholder='후기 내용으로 검색'
        />
      </div>
      <ReviewStatusFilter value={selectedStatus} onChange={onStatusChange} />
    </section>
  );
};

export default ReviewSearchFilterSection;
