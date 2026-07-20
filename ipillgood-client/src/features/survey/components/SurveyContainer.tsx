'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import StepNavigation from './StepNavigation';
import BasicInfoStep from './info-step/BasicInfoStep';
import { TextButton } from '@/shared/components';
import LifestyleStep from './LifestyleStep';
import HealthStateStep from './HealthStateStep';
import HealthConcernStep from './HealthConcernStep';
import SupplementStep from './SupplementStep';

const SurveyContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = Number(searchParams.get('step') ?? 1);

  // 이전 단계로 이동 (1단계에서는 이전 페이지로 이동)
  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    router.push(`/survey?step=${step - 1}`);
  };

  const handleNext = () => {
    if (step < 5) {
      router.push(`/survey?step=${step + 1}`);
      return;
    }

    // TODO: 설문 제출 API
    console.log('설문 완료');

    router.push('/survey/analyzing');
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <StepNavigation step={step} onBack={handleBack} />

      {step === 1 && <BasicInfoStep />}
      {step === 2 && <LifestyleStep />}
      {step === 3 && <HealthStateStep />}
      {step === 4 && <HealthConcernStep />}
      {step === 5 && <SupplementStep />}

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
