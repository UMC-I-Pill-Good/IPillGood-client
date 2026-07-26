import { InquirySection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const InquiryPage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='문의/고객센터' />
      <InquirySection />
    </main>
  );
};

export default InquiryPage;
