import { FaqSection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const FaqPage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='모든 FAQ 보기' />
      <FaqSection />
    </main>
  );
};

export default FaqPage;
