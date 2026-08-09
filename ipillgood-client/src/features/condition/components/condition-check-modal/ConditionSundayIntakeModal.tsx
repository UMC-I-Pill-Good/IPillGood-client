'use client';

import { TextButton } from '@/shared/components';
import ConditionCheckModalLayout from './ConditionCheckModalLayout';

interface ConditionSundayIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ConditionSundayIntakeModal = ({
  isOpen,
  onClose,
  onContinue,
}: ConditionSundayIntakeModalProps) => {
  return (
    <ConditionCheckModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy='sunday-warning-title'
      ariaDescribedBy='sunday-warning-content'
      backdropClassName='px-4'
      contentClassName='w-full max-w-[310px] items-center justify-center gap-5 rounded-2xl border-0 px-7.5 py-6 shadow-[4px_4px_40px_0_rgba(0,0,0,0.12)]'
    >
        <div className='flex flex-col items-center justify-center gap-2 text-center'>
          <h3
            id='sunday-warning-title'
            className='text-base font-semibold leading-none tracking-normal text-black'
          >
            오늘 영양제 섭취 전이에요!
          </h3>
          <p
            id='sunday-warning-content'
            className='whitespace-pre-line text-xs font-medium leading-none tracking-normal text-semantic-600'
          >
            지금 컨디션을 기록하면 미섭취가 반영되어{'\n'}점수에 영향을 줄 수 있어요.
          </p>
        </div>

        <div className='flex w-full items-center justify-center gap-2.5'>
          <TextButton
            type='button'
            text='취소'
            variant='outline'
            size='sm'
            onClick={onClose}
            className='flex-1'
          />
          <TextButton
            type='button'
            text='계속하기'
            variant='primary'
            size='sm'
            onClick={onContinue}
            className='flex-1'
          />
        </div>
    </ConditionCheckModalLayout>
  );
};

export default ConditionSundayIntakeModal;
