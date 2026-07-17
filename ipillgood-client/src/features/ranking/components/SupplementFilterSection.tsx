import SupplementFilterBar from './SupplementFilterBar';

const SupplementFilterSection = () => {
  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between gap-1'>
        <h2 className='typo-body-5 text-black'>필터</h2>
        <button type='button' className='typo-caption-6 text-neutral-800'>
          초기화
        </button>
      </div>
      <SupplementFilterBar />
    </section>
  );
};

export default SupplementFilterSection;
