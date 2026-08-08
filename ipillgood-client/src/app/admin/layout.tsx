import type { ReactNode } from 'react';

import { AdminFooter, AdminHeader, AdminSidebar } from '@/shared/layout';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mx-auto flex min-h-dvh w-full max-w-7xl bg-background'>
      <AdminSidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <AdminHeader />
        <div className='flex flex-1 flex-col'>{children}</div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
