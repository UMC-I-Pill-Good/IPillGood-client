import { AboutSection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const AboutPage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='서비스 소개 & 오픈소스' />
      <AboutSection />
    </main>
  );
};

export default AboutPage;
