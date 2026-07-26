'use client';

/**
 * 궁금한 건강 상태 선택 상단 안내 타이틀 렌더링 전담 컴포넌트
 */
const HealthStatusHeader = () => {
  return (
    <section className='flex w-full flex-col gap-2.5 px-5 pt-4 pb-0 box-border'>
      <div className='inline-flex items-baseline gap-1.5'>
        <h1 className='text-xl font-semibold text-black leading-tight'>
          궁금한 건강 상태 선택
        </h1>
        <span className='text-sm font-normal text-neutral-800'>
          (단일 선택)
        </span>
      </div>

      <p className='text-base font-medium text-point-900 leading-normal'>
        어떤 부위가 궁금하세요?
      </p>
    </section>
  );
};

export default HealthStatusHeader;
