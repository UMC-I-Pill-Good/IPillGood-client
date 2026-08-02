'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import StepNavigation from './StepNavigation';
import BasicInfoStep from './info-step/BasicInfoStep';
import LifestyleStep from './lifestyle-step/LifestyleStep';
import HealthStateStep from './health-state-step/HealthStateStep';
import HealthConcernStep from './health-concern-step/HealthConcernStep';
import SupplementStep from './supplement-step/SupplementStep';

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

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <StepNavigation step={step} onBack={handleBack} />

      {step === 1 && <BasicInfoStep />}
      {step === 2 && <LifestyleStep />}
      {step === 3 && <HealthStateStep />}
      {step === 4 && <HealthConcernStep />}
      {step === 5 && <SupplementStep />}
    </main>
  );
};

export default SurveyContainer;
