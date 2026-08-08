'use client';

import { useState } from 'react';

import { useDashboardListQuery } from '../hooks/useDashboardListQuery';
import type { DashboardTableType } from '../types/Dashboard';
import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardTable from './DashboardTable';

interface DashboardListSectionProps {
  title: string;
  href: string;
  tableType: DashboardTableType;
}

const DashboardListSection = ({
  title,
  href,
  tableType,
}: DashboardListSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dashboardListQuery = useDashboardListQuery(tableType, currentPage);
  const reviewList = dashboardListQuery.data?.reviewList ?? [];
  const faqList = dashboardListQuery.data?.faqList ?? [];
  const totalPages = dashboardListQuery.data?.totalPages ?? 0;

  return (
    <section aria-busy={dashboardListQuery.isPending} className='flex flex-col gap-2'>
      <DashboardSectionHeader title={title} href={href} />
      {dashboardListQuery.isPending && (
        <div
          role='status'
          aria-label={`${title} 불러오는 중`}
          className='mx-10 h-[320px] animate-pulse rounded-[20px] bg-secondary-100'
        >
          <span className='sr-only'>{title} 목록을 불러오는 중입니다.</span>
        </div>
      )}
      {dashboardListQuery.isError && (
        <p role='alert' className='px-10 text-sm text-semantic-500'>
          목록을 불러오지 못했습니다.
        </p>
      )}
      {!dashboardListQuery.isPending && (
        <DashboardTable
          tableType={tableType}
          reviewList={reviewList}
          faqList={faqList}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default DashboardListSection;
