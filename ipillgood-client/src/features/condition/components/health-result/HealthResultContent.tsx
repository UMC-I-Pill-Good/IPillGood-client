'use client';

import { Header } from '@/shared/layout/Header';
import { useHealthResultFlow } from '../../hooks/useHealthResultFlow';
import HealthDeclineCauseSection from './HealthDeclineCauseSection';
import RecommendedIngredientSection from './RecommendedIngredientSection';

const HealthResultSkeleton = () => (
  <div
    className='flex w-full flex-1 flex-col'
    aria-label='건강 상태 결과를 불러오는 중'
    aria-busy='true'
  >
    <section className='flex min-h-[137px] w-full flex-col gap-2.5 px-5 py-4' aria-hidden='true'>
      <div className='h-6 w-20 rounded-full bg-neutral-200 motion-safe:animate-pulse motion-safe:[animation-duration:1s]' />
      <div className='flex min-h-[75px] w-full flex-col gap-2 rounded-lg bg-white/60 px-3 py-3 motion-safe:animate-pulse motion-safe:[animation-duration:1s]'>
        <div className='h-3 w-full rounded-full bg-neutral-200' />
        <div className='h-3 w-4/5 rounded-full bg-neutral-200' />
        <div className='h-3 w-2/3 rounded-full bg-neutral-200' />
      </div>
    </section>

    <section className='flex w-full flex-col gap-2 px-5 py-4' aria-hidden='true'>
      <div className='h-6 w-28 rounded-full bg-neutral-200 motion-safe:animate-pulse motion-safe:[animation-duration:1s]' />
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={`recommended-ingredient-skeleton-${index}`}
          className='flex min-h-[144px] w-full gap-3 rounded-[20px] bg-primary-200/50 px-5 py-4 motion-safe:animate-pulse motion-safe:[animation-duration:1s]'
        >
          <div className='h-20 w-[54px] shrink-0 rounded-lg bg-neutral-200' />
          <div className='flex flex-1 flex-col gap-3 py-1'>
            <div className='h-4 w-2/5 rounded-full bg-neutral-200' />
            <div className='h-3 w-full rounded-full bg-neutral-200' />
            <div className='h-3 w-4/5 rounded-full bg-neutral-200' />
            <div className='flex gap-2 pt-1'>
              <div className='h-6 w-14 rounded-full bg-neutral-200' />
              <div className='h-6 w-16 rounded-full bg-neutral-200' />
            </div>
          </div>
        </div>
      ))}
    </section>
  </div>
);

const HealthResultContent = () => {
  const {
    majorCategoryLabel,
    minorCategoryLabel,
    data,
    isLoading,
    error,
    isValid,
    handleBack,
    handleClose,
    handleIngredientClick,
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
        <div className='flex flex-1 items-center justify-center p-5 text-center text-neutral-500 typo-body-5 leading-none'>
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
        <HealthResultSkeleton />
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
        <div className='flex flex-1 items-center justify-center p-5 text-center text-neutral-500 typo-body-5 leading-none'>
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
      <RecommendedIngredientSection
        ingredientList={data.recommendedIngredients}
        onIngredientClick={handleIngredientClick}
      />
    </div>
  );
};

export default HealthResultContent;
