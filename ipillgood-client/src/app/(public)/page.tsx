import {
  LogoIcon,
  Rectangle1Icon,
  Rectangle2Icon,
  Rectangle3Icon,
  Rectangle4Icon,
  Rectangle5Icon,
} from '@/assets';
import { Tilt_Warp } from 'next/font/google';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

const HomePage = () => {
  return (
    <main className='relative flex h-screen items-center justify-center overflow-hidden bg-primary-500'>
      {/* Background */}
      <Rectangle1Icon className='absolute -top-6 left-10' />

      <Rectangle2Icon className='absolute top-30 right-24' />

      <Rectangle3Icon className='absolute bottom-36 left-6' />

      <Rectangle4Icon className='absolute bottom-6 right-10 z-10' />

      <Rectangle5Icon className='absolute -bottom-4 right-10' />

      {/* Center */}
      <section className='relative flex flex-col items-center justify-center'>
        <LogoIcon />

        <h1
          className={`${tiltWarp.className} absolute text-6xl font-bold text-white whitespace-nowrap [text-shadow:4px_4px_4px_rgba(0,0,0,0.15),8px_2px_40px_rgba(52,116,255,0.6)]`}
        >
          I Pill Good
        </h1>
        <p className='absolute bottom-19 text-white typo-body-10 text-center'>
          건강한 습관의 시작, 아필굿
        </p>
      </section>
    </main>
  );
};

export default HomePage;
