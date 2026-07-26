import { MySection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const MyPage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='마이페이지' showBackButton={false} />
      <MySection />
    </main>
  );
};

export default MyPage;
