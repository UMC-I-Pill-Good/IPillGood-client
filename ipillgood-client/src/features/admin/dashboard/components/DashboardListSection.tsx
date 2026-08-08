'use client';

import { useState } from 'react';

import type { DashboardTableType } from '../types/Dashboard';
import DashboardSectionHeader from './DashboardSectionHeader';
import DashboardTable from './DashboardTable';

interface DashboardListSectionProps {
  title: string;
  href: string;
  totalPages: number;
  tableType: DashboardTableType;
}

const DashboardListSection = ({
  title,
  href,
  totalPages,
  tableType,
}: DashboardListSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className='flex flex-col gap-2'>
      <DashboardSectionHeader title={title} href={href} />
      <DashboardTable
        tableType={tableType}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default DashboardListSection;
