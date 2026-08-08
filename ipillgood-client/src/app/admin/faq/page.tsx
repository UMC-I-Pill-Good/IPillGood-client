import { FaqListControls, FaqSearchFilterSection } from '@/features/admin/faq';

const FaqManagementPage = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <FaqSearchFilterSection />
      <FaqListControls />
    </main>
  );
};

export default FaqManagementPage;
