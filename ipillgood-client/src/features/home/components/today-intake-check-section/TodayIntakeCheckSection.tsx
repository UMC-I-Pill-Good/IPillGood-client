'use client';

import { TextButton } from '@/shared/components';
import IntakeCheckModal from './IntakeCheckModal';
import { useIntakeToday } from '../../hooks/useIntakeToday';

const TodayIntakeCheckSection = () => {
  const {
    allCompleted,
    pendingProducts,
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    isConfirming,
  } = useIntakeToday();

  if (allCompleted) return null;

  return (
    <section className='w-full flex flex-col justify-center items-center  mt-4  gap-3 py-4 rounded-[20px] border border-white bg-white/50 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
      <article className='flex flex-col justify-center items-center gap-0.5'>
        <p className='typo-body-9'>
          오늘 아직 <span className='text-primary-600'>영양제</span>를 섭취하지 않았어요!
        </p>
        <p className='typo-caption-7 text-neutral-800'>
          오늘도 영양제를 섭취하고 연속 섭취일을 잃지 말아요!
        </p>
      </article>
      <TextButton
        type='button'
        text='오늘의 영양제 먹었어요!'
        variant='primary'
        size='sm'
        className='rounded-full w-43 h-9'
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <IntakeCheckModal
          pendingProducts={pendingProducts}
          isConfirming={isConfirming}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </section>
  );
};

export default TodayIntakeCheckSection;
