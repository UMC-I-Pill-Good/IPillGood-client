'use client';

import { useRouter } from 'next/navigation';
import StepNavigation from './StepNavigation';
import { useState } from 'react';
import BasicInfoStep from './BasicInfoStep';

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

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <StepNavigation step={step} onBack={handleBack} />

      <BasicInfoStep />
    </main>
  );
};

export default SurveyContainer;
