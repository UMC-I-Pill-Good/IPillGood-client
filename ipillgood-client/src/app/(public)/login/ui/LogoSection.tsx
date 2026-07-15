'use client';

import { motion } from 'framer-motion';
import { LogoIcon } from '@/assets';
import { Tilt_Warp } from 'next/font/google';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

export const LogoSection = () => {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
      }}
      className='relative z-10 flex flex-col items-center justify-center mt-12'
    >
      <p className='typo-body-1 text-primary-500'>나에게 맞는 영양제 추천</p>

      <div className='flex items-center justify-center pt-18'>
        <LogoIcon width='245' height='233' />
        <h1
          className={`${tiltWarp.className} absolute text-[50px] font-bold text-white whitespace-nowrap [text-shadow:4px_4px_4px_rgba(0,0,0,0.2),8px_2px_40px_rgba(52,116,255,0.4)]`}
        >
          I Pill Good
        </h1>
      </div>
    </motion.section>
  );
};
