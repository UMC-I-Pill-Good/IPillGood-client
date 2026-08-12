'use client';

import { Background } from '@/app/(public)/(landing)/ui/Background';
import Image from 'next/image';
import ManhwaImage from '@/assets/images/manhwa.png';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRecommendationQuery, useResetSurvey } from '@/features/survey/hooks';
import AnalyzeError from './AnalyzeError';
import { useMyInfoQuery } from '@/shared/hooks';

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
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
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const SurveyAnalyze = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetSurvey = useResetSurvey();

  const recommendationId = Number(searchParams.get('recommendationId'));

  const { data: myInfoData } = useMyInfoQuery();

  const { data } = useRecommendationQuery(recommendationId);

  const status = data?.result.status;

  // 3초 뒤 자동으로 결과 페이지 전환
  useEffect(() => {
    if (!status) return;

    if (status === 'SUCCESS') {
      const timer = setTimeout(() => {
        router.replace(`/survey/result?recommendationId=${recommendationId}`);
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (status === 'NO_RESULT') {
      alert('추천 가능한 영양제가 없습니다. 설문을 처음부터 다시 진행해주세요.');
      resetSurvey.resetSurvey();
      router.replace('/survey');
    }
  }, [status, router, recommendationId, resetSurvey]);

  if (status === 'FAILED') {
    return <AnalyzeError recommendationId={recommendationId} />;
  }

  return (
    <main className='relative isolate flex min-h-screen justify-center overflow-hidden bg-[linear-gradient(225deg,#CBD6FF_0%,#92A8FF_59%,#92A8FF_80%,#7590ff_100%)] p-5'>
      <Background />

      <motion.section
        className='z-10 flex flex-col items-center text-center'
        variants={container}
        initial='hidden'
        animate='show'
      >
        <motion.p variants={item} className='text-primary-700 typo-body-10 mb-16'>
          Pill Good? Feel Good!!
        </motion.p>
        <motion.p
          variants={item}
          className='typo-subtitle-6 text-center typo-title-gosanja text-white mb-4'
        >
          <span className='block leading-normal'>
            <span className='text-primary-700'>{myInfoData?.result.nickname} 님</span>에게 딱 맞는
            영양제를
            <br />
            고르고 있어요.
          </span>
          <span className='leading-normal block'>잠시만 기다려 주세요!</span>
        </motion.p>

        <motion.p variants={item} className='text-point typo-caption-6 p-4 mb-17'>
          아필굿은 여러분께 참고용 정보를 제공합니다.
        </motion.p>

        <motion.div
          variants={item}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image src={ManhwaImage} alt='4컷 만화' preload />
        </motion.div>
      </motion.section>
    </main>
  );
};

export default SurveyAnalyze;
