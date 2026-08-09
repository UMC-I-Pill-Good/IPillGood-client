'use client';

import { useState } from 'react';

import { REVIEW_REPORT_PAGE_SIZE } from '../constants/ReviewReport';
import { useAdminReviewReportListQuery } from '../hooks/useAdminReviewReportListQuery';
import type { ReportedReviewType, ReportStatusFilterType } from '../types/ReviewReport';
import ReviewReportTable from './ReviewReportTable';
import ReviewReportModal from './ReviewReportModal';
import ReviewSearchFilterSection from './ReviewSearchFilterSection';

const ReviewManagementContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ReportStatusFilterType>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const reportListQuery = useAdminReviewReportListQuery({
    keyword: keyword || undefined,
    status: selectedStatus,
    page: currentPage - 1,
    size: REVIEW_REPORT_PAGE_SIZE,
  });
  const result = reportListQuery.data?.result;
  const reviewList: ReportedReviewType[] =
    result?.reports.map((review) => ({
      id: review.reportId,
      content: review.reviewContent,
      reason: review.reason.label,
      reportedAt: review.reportedAt.slice(0, 10),
      status: review.status.label,
    })) ?? [];

  const handleSearch = (value: string) => {
    setKeyword(value.trim());
    setCurrentPage(1);
  };

  const handleStatusChange = (value: ReportStatusFilterType) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  return (
    <main className='flex min-h-0 flex-1 flex-col'>
      <ReviewSearchFilterSection
        searchValue={searchValue}
        selectedStatus={selectedStatus}
        onSearchValueChange={setSearchValue}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
      />
      {reportListQuery.isError && (
        <p role='alert' className='px-10 pb-2 text-sm text-semantic-500'>
          후기 신고 목록을 불러오지 못했습니다.
        </p>
      )}
      <section aria-label='후기 신고 목록' className='flex min-h-0 flex-1 flex-col px-10 pb-2'>
        <div aria-busy={reportListQuery.isPending} className='flex min-h-0 flex-1 flex-col'>
          <ReviewReportTable
            reviewList={reviewList}
            currentPage={currentPage}
            totalPages={result?.totalPages ?? 0}
            onPageChange={setCurrentPage}
            onViewReview={(review) => setSelectedReportId(review.id)}
          />
        </div>
      </section>
      {selectedReportId !== null && (
        <ReviewReportModal reportId={selectedReportId} onClose={() => setSelectedReportId(null)} />
      )}
    </main>
  );
};

export default ReviewManagementContent;
