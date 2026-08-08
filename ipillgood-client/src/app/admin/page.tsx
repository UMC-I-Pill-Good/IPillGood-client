import { DashboardHeader, DashboardListSection } from '@/features/admin/dashboard';

const AdminDashboardPage = () => {
  return (
    <main className='flex flex-1 flex-col pb-4'>
      <DashboardHeader />
      <div className='mt-8 flex flex-col gap-2'>
        <DashboardListSection
          title='최근 신고된 후기'
          href='/admin/reviews'
          totalPages={5}
          tableType='reviews'
        />
        <DashboardListSection
          title='최근 신고된 FAQ'
          href='/admin/faq'
          totalPages={5}
          tableType='faq'
        />
      </div>
    </main>
  );
};

export default AdminDashboardPage;
