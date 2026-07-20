'use client';

import { Background } from '@/app/(public)/(landing)/ui/Background';
import Image from 'next/image';
import ManhwaImage from '@/assets/images/manhwa.png';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const SurveyAnalyzePage = () => {
  const router = useRouter();

  // 3초 뒤 자동으로 결과 페에지 전환 (API 연동 전 임시)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/survey/result');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className='relative isolate flex h-screen justify-center overflow-hidden bg-[linear-gradient(225deg,#CBD6FF_0%,#92A8FF_59%,#92A8FF_80%,#7590ff_100%)] p-5'>
      <Background />

      <motion.section
        className='z-10 mt-20 flex flex-col items-center text-center'
        variants={container}
        initial='hidden'
        animate='show'
      >
        <motion.p variants={item} className='text-[#6580EE] typo-body-10 mb-3'>
          Pill Good? Feel Good!!
        </motion.p>
        <motion.p variants={item} className='typo-subtitle-4 text-center text-white mb-20'>
          <span className='block leading-normal'>
            <span className='text-[#6580EE]'> 님</span>에게 딱 맞는 영양제를
            <br />
            고르고 있어요.
          </span>

          <span className='leading-normal block'>잠시만 기다려 주세요!</span>
        </motion.p>
        <motion.div
          variants={item}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image src={ManhwaImage} alt='4컷 만화' priority />
        </motion.div>
      </motion.section>
    </main>
  );
};

export default SurveyAnalyzePage;
