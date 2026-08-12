'use client';

import { useState } from 'react';

import { FetchError } from '@/shared/components';

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
        <p
          role='status'
          className='mx-10 flex h-[320px] items-center justify-center text-lg text-neutral'
        >
          {title} 목록을 불러오는 중입니다.
        </p>
      )}
      {dashboardListQuery.isError && (
        <FetchError
          description={`${title} 목록을 불러오지 못했습니다.`}
          onRetry={() => void dashboardListQuery.refetch()}
          className='mx-10 h-[320px] min-h-0'
        />
      )}
      {!dashboardListQuery.isPending && !dashboardListQuery.isError && (
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
