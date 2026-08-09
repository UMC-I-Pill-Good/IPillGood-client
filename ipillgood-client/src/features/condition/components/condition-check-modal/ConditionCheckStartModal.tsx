'use client';

import {
  ConditionCheckCircleIcon,
  ConditionVitalityIcon,
  ConditionSleepIcon,
  ConditionIntakeIcon,
} from '@/assets';
import { IconButton, TextButton } from '@/shared/components';
import { X } from 'lucide-react';
import ConditionCheckRow from './ConditionCheckRow';
import ConditionCheckModalLayout from './ConditionCheckModalLayout';

interface ConditionCheckStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

const ConditionCheckStartModal = ({
  isOpen,
  onClose,
  onStart,
}: ConditionCheckStartModalProps) => {
  return (
    <ConditionCheckModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel='컨디션 체크 시작 팝업'
    >
        <header className='flex h-9 w-full items-center justify-end px-5'>
          <IconButton
            icon={<X size={24} className='text-neutral-800' />}
            ariaLabel='팝업 닫기'
            onClick={onClose}
          />
        </header>

        <div className='flex w-full flex-col items-center gap-4 px-5 py-4'>
          <div className='flex w-full flex-col items-center gap-2'>
            <div className='flex items-center justify-center py-1'>
              <ConditionCheckCircleIcon className='size-[79px] shrink-0' />
            </div>

            <div className='flex w-full flex-col items-center gap-2'>
              <h2 className='typo-body-5 text-center text-black'>
                이번 주 컨디션 체크
              </h2>

              <p className='typo-caption-2 whitespace-pre-line text-center text-neutral-800'>
                {'일주일에 한 번, 이번 주를 마무리하며\n내 몸 상태를 체크해 보세요!'}
              </p>
            </div>
          </div>

          <div className='flex w-full flex-col items-center justify-center gap-2 rounded-lg py-2'>
            <ConditionCheckRow
              icon={ConditionVitalityIcon}
              label='활력'
              value='1-5점'
            />
            <ConditionCheckRow
              icon={ConditionSleepIcon}
              label='수면 시간'
              value='시간'
            />
            <ConditionCheckRow
              icon={ConditionIntakeIcon}
              label='섭취한 영양제 수'
              value='자동'
            />
          </div>
        </div>

        <div className='flex w-full px-5 pt-4'>
          <TextButton
            type='button'
            text='컨디션 체크 시작하기'
            variant='primary'
            size='md'
            className='w-full'
            onClick={onStart}
          />
        </div>
    </ConditionCheckModalLayout>
  );
};

export default ConditionCheckStartModal;
