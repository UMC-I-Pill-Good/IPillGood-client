'use client';

import { useState } from 'react';

import { AdminPagination } from '@/shared/components';

import DashboardSectionHeader from './DashboardSectionHeader';

interface DashboardListSectionProps {
  title: string;
  href: string;
  totalPages: number;
}

const DashboardListSection = ({ title, href, totalPages }: DashboardListSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className='flex flex-col gap-2'>
      <DashboardSectionHeader title={title} href={href} />
      <div>{/* 관리자 공통 테이블 사용 */}</div>
      <AdminPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default DashboardListSection;
