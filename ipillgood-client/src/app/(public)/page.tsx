import { LogoIcon } from '@/assets';
import { Tilt_Warp } from 'next/font/google';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

const OnBoardingPage = () => {
  return (
    <main className='relative flex h-screen items-center justify-center overflow-hidden bg-primary-500'>
      {/* Background */}
      <div
        className='absolute top-4 left-15 w-[114.36px] h-[30.73px] rotate-[-45.94deg] rounded-full border-t border-b border-white/30 bg-[#4751E7]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute top-40 right-22 w-[50.03px] h-[30.73px] rotate-[56.71deg] rounded-full border-r border-l border-white/30 bg-[#F58282]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 2px 2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute bottom-36 left-15 w-[79.62px] h-[41.11px] rotate-[-17.73deg] rounded-full border-r border-b border-t border-white/30 bg-white/20'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute right-17 bottom-11 w-[65.91px] h-[20.56px] rotate-[125.47deg] rounded-full border-t border-b border-l border-white/30'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 3px -2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute right-18 bottom-0 w-[114.04px] h-[53.91px] rotate-[-145.8deg] rounded-full bg-[#E29B9B]/20'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 0 -4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Center */}
      <section className='relative flex flex-col items-center justify-center'>
        <LogoIcon />

        <h1
          className={`${tiltWarp.className} absolute text-6xl font-bold text-white whitespace-nowrap [text-shadow:4px_4px_4px_rgba(0,0,0,0.15),8px_2px_40px_rgba(52,116,255,0.6)]`}
        >
          I Pill Good
        </h1>
        <p className='absolute bottom-19 text-white typo-body-11 text-center'>
          건강한 습관의 시작, 아필굿
        </p>
      </section>
    </main>
  );
};

export default OnBoardingPage;
