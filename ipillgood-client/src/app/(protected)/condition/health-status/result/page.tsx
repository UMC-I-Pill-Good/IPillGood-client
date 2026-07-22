import { Suspense } from 'react';
import HealthResultContent from '@/features/condition/components/health-result/HealthResultContent';

const HealthResultPage = () => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-dvh w-full items-center justify-center bg-background'>
          <div className='text-center text-neutral-500 typo-body-5'>로딩 중...</div>
        </div>
      }
    >
      <HealthResultContent />
    </Suspense>
  );
};

export default HealthResultPage;
