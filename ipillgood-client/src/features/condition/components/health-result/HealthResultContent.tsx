'use client';

import { Suspense } from 'react';
import { Header } from '@/shared/layout/Header';
import { useHealthResultFlow } from '../../hooks/useHealthResultFlow';
import HealthDeclineCauseSection from './HealthDeclineCauseSection';
import RecommendedIngredientSection from './RecommendedIngredientSection';

const HealthResultInner = () => {
  const {
    majorCategoryLabel,
    minorCategoryLabel,
    data,
    isLoading,
    error,
    isValid,
    handleBack,
    handleClose,
  } = useHealthResultFlow();

  if (!isValid) {
    return (
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col overflow-x-hidden'>
        <Header
          title='건강 상태 결과'
          showBackButton={true}
          showCloseButton={true}
          onBack={handleBack}
          onClose={handleClose}
        />
        <div className='flex flex-1 items-center justify-center p-5 text-center text-neutral-500 typo-body-5'>
          선택된 건강 상태 정보가 없습니다. 다시 선택해 주세요.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col overflow-x-hidden'>
        <Header
          title={`궁금 상태: ${majorCategoryLabel} - ${minorCategoryLabel}`}
          showBackButton={true}
          showCloseButton={true}
          onBack={handleBack}
          onClose={handleClose}
        />
        <div className='flex flex-1 items-center justify-center text-center text-neutral-500 typo-body-5'>
          결과를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col overflow-x-hidden'>
        <Header
          title={`궁금 상태: ${majorCategoryLabel} - ${minorCategoryLabel}`}
          showBackButton={true}
          showCloseButton={true}
          onBack={handleBack}
          onClose={handleClose}
        />
        <div className='flex flex-1 items-center justify-center p-5 text-center text-neutral-500 typo-body-5'>
          오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col items-stretch overflow-x-hidden'>
      {/* 1. Header */}
      <Header
        title={`궁금 상태: ${majorCategoryLabel} - ${minorCategoryLabel}`}
        showBackButton={true}
        showCloseButton={true}
        onBack={handleBack}
        onClose={handleClose}
      />

      {/* 2. 감퇴 원인 섹션 */}
      <HealthDeclineCauseSection declineCause={data.declineCause} />

      {/* 3. 추천 성분 섹션 */}
      <RecommendedIngredientSection ingredientList={data.recommendedIngredients} />
    </div>
  );
};

const HealthResultContent = () => {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-dvh w-full items-center justify-center bg-[#F2F6FF]'>
          <div className='text-center text-neutral-500 typo-body-5'>로딩 중...</div>
        </div>
      }
    >
      <HealthResultInner />
    </Suspense>
  );
};

export default HealthResultContent;
