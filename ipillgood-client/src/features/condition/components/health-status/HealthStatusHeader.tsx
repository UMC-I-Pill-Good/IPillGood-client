'use client';

const HealthStatusHeader = () => {
  return (
    <section className='flex w-full flex-col gap-2.5 px-5 pt-4 pb-0 box-border'>
      <div className='inline-flex items-baseline gap-1.5'>
        <h1 className='typo-title-gosanja text-xl font-normal not-italic leading-none text-black'>
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
