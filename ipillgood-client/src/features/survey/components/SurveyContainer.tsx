'use client';

import { useRouter } from 'next/navigation';
import StepNavigation from './StepNavigation';
import { useState } from 'react';
import BasicInfoStep from './BasicInfoStep';
import { TextButton } from '@/shared/components';

const SurveyContainer = () => {
  const router = useRouter();

  const [step, setStep] = useState(1); // 초기 설문 단계

  // 이전 단계로 이동 (1단계에서는 이전 페이지로 이동)
  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    setStep(1);
  };

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
      return;
    }

    // TODO: 설문 제출 API
    console.log('설문 완료');
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <StepNavigation step={step} onBack={handleBack} />

      {step === 1 && <BasicInfoStep />}

      <TextButton
        type='button'
        text={step === 5 ? '설문 완료' : '다음'}
        size='xl'
        className='mt-auto w-full'
        onClick={handleNext}
      />
    </main>
  );
};

export default SurveyContainer;
