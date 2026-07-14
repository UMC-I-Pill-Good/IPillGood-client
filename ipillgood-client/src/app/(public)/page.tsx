import { LogoIcon } from '@/assets';
import { Tilt_Warp } from 'next/font/google';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

const OnBoardingPage = () => {
  return (
    <main className='relative isolate flex h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#9ABAFF_0%,#5D90FF_64%,#4580FF_100%)]'>
      {/* Background */}
      <div
        className='bg-blur absolute top-22 -right-20 h-52 w-52'
        style={{
          background: 'rgba(222,160,255,.5)',
          filter: 'blur(70px)',
        }}
      />

      <div
        className='bg-blur absolute -left-22.5 top-75 h-[319.48px] w-[386.21px] rotate-[-26.62deg]'
        style={{
          background: 'rgba(194,153,255,.5)',
          filter: 'blur(90px)',
        }}
      />

      <div
        className='bg-blur absolute -right-5 bottom-25 h-[161.7px] w-[181.93px] rotate-[-26.62deg]'
        style={{
          background: 'rgba(153,97,236,.8)',
          filter: 'blur(70px)',
        }}
      />

      {/* Capsule */}
      <div
        className='absolute top-4 left-15 h-[30.73px] w-[114.36px] rotate-[-45.94deg] rounded-full border-y border-white/30 bg-[#4751E7]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute top-40 right-22 h-[30.73px] w-[50.03px] rotate-[56.71deg] rounded-full border-x border-white/30 bg-[#FFA2A2]/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 2px 2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute bottom-36 left-15 h-[41.11px] w-[79.62px] rotate-[-17.73deg] rounded-full border-r border-y border-white/30 bg-white/20'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute bottom-11 right-17 h-[20.56px] w-[65.91px] rotate-[125.47deg] rounded-full border-l border-y border-white/30'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 3px -2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute bottom-0 right-18 h-[53.91px] w-[114.04px] rotate-[-145.8deg] rounded-full bg-[#E29B9B]/20'
        style={{
          boxShadow:
            'inset 0 4px 4px rgba(155,161,255,.2), inset 0 -4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Content */}
      <section className='relative z-10 flex flex-col items-center justify-center'>
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
