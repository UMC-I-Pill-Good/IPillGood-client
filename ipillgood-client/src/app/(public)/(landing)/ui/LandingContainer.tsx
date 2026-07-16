'use client';

import { LogoIcon } from '@/assets';
import { motion } from 'framer-motion';
import { Tilt_Warp } from 'next/font/google';
import { Background } from './Background';
import { useRouter } from 'next/navigation';
import { TextButton } from '@/shared/components';

export const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

export const LandingContainer = () => {
  const router = useRouter();

  return (
    <main className='relative isolate flex h-screen items-center justify-center overflow-hidden bg-[linear-gradient(225deg,#9ABAFF_0%,#7F99FF_64%,#4580FF_100%)] bg-[#4580FF]'>
      {/* Background */}
      <Background />

      {/* Content */}

      <motion.section
        initial={{
          opacity: 0,
          scale: 0.95,
          filter: 'blur(15px)',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        className='relative z-10 flex flex-col items-center justify-center'
      >
        <LogoIcon width='261' height='272' />
        <h1
          className={`${tiltWarp.className} absolute text-6xl font-bold text-white whitespace-nowrap [text-shadow:4px_4px_4px_rgba(0,0,0,0.15),8px_2px_40px_rgba(52,116,255,0.6)]`}
        >
          I Pill Good
        </h1>
        <p className='absolute bottom-19 text-white typo-body-11 text-center'>
          건강한 습관의 시작, 아필굿
        </p>
      </motion.section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.3,
          duration: 1.5,
          ease: 'easeInOut',
        }}
        className='absolute bottom-4 left-5 right-5'
      >
        <TextButton
          type='button'
          text='시작하기'
          size='xl'
          className='bg-white/20 hover:bg-white/30 active:bg-white/40 w-full'
          onClick={() => router.push('/login')}
        />
      </motion.div>
    </main>
  );
};
