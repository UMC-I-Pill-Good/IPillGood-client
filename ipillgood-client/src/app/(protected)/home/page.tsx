import { HeaderLogoIcon } from '@/assets';
import HomeSection from '@/features/home/components/home-section/HomeSection';

const HomePage = () => {
  return (
    <main className='flex items-center justify-center flex-col px-5 pb-28.5'>
      <header className='flex items-center w-full'>
        <HeaderLogoIcon className='-ml-4' role='img' aria-label='I Pill Good' />
      </header>
      <HomeSection />
    </main>
  );
};

export default HomePage;
