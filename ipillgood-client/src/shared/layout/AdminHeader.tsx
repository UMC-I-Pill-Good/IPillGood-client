'use client';

import { usePathname } from 'next/navigation';

import { ADMIN_HEADER_LIST } from '@/shared/constants/AdminHeader';

const AdminHeader = () => {
  const pathname = usePathname();
  const headerContent = ADMIN_HEADER_LIST.find(
    (header) => pathname === header.pathname || pathname.startsWith(`${header.pathname}/`),
  );

  if (!headerContent) {
    return null;
  }

  return (
    <header className='flex shrink-0 items-center justify-between bg-white px-5 py-4'>
      <div className='flex w-full flex-col justify-center gap-1'>
        <div className='flex items-center gap-1 text-center text-sm leading-none whitespace-nowrap'>
          <span className='font-medium text-neutral'>{headerContent.parentTitle} &gt;</span>
          <span className='font-semibold text-black'>{headerContent.currentTitle}</span>
        </div>
        <h1 className='text-[28px] font-semibold leading-none text-black'>
          {headerContent.pageTitle}
        </h1>
      </div>
    </header>
  );
};

export default AdminHeader;
