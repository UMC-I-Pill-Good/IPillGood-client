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
    handleClose,
    handleIngredientClick,
  } = useHealthResultFlow();

  if (!isValid) {
    return (
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col overflow-x-hidden'>
        <Header
          title='건강 상태 결과'
          showCloseButton={true}
          onClose={handleClose}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col overflow-x-hidden'>
        <Header
          title={`궁금 상태: ${majorCategoryLabel} - ${minorCategoryLabel}`}
          showCloseButton={true}
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
          showCloseButton={true}
          onClose={handleClose}
        />
      </div>
    );
  }

  return (
    <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-24 flex flex-col items-stretch overflow-x-hidden'>
      <Header
        title={`궁금 상태: ${majorCategoryLabel} - ${minorCategoryLabel}`}
        showCloseButton={true}
        onClose={handleClose}
      />

      <HealthDeclineCauseSection declineCause={data.declineCause} />

      <RecommendedIngredientSection
        ingredientList={data.recommendedIngredients}
        onIngredientClick={handleIngredientClick}
      />
    </div>
  );
};

export default HealthResultContent;
