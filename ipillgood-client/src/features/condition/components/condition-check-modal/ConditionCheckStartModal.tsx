'use client';

import { useRef } from 'react';
import {
  ConditionCheckCircleIcon,
  ConditionVitalityIcon,
  ConditionSleepIcon,
  ConditionIntakeIcon,
} from '@/assets';
import { IconButton, TextButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { X } from 'lucide-react';
import ConditionCheckRow from './ConditionCheckRow';

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
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5'
      role='dialog'
      aria-modal='true'
      aria-label='컨디션 체크 시작 팝업'
    >
      <div
        ref={contentRef}
        className='flex w-[351px] flex-col rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {/* Header - 공통 IconButton 사용 */}
        <header className='flex h-9 w-full items-center justify-end px-5'>
          <IconButton
            icon={<X size={24} className='text-[#7E8387]' />}
            ariaLabel='팝업 닫기'
            onClick={onClose}
          />
        </header>

        {/* Body */}
        <div className='flex w-full flex-col items-center gap-4 px-5 py-4'>
          {/* Intro Section */}
          <div className='flex w-full flex-col items-center gap-2'>
            <div className='flex items-center justify-center py-1'>
              <ConditionCheckCircleIcon className='size-[79px] shrink-0' />
            </div>

            <div className='flex w-full flex-col items-center gap-2'>
              <h2 className='typo-body-5 text-center text-[#111111]'>
                이번 주 컨디션 체크
              </h2>

              <p className='typo-caption-2 whitespace-pre-line text-center text-neutral-800'>
                {'일주일에 한 번, 이번 주를 마무리하며\n내 몸 상태를 체크해 보세요!'}
              </p>
            </div>
          </div>

          {/* Condition rows */}
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

        {/* Footer - 공통 TextButton 사용 */}
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
      </div>
    </div>
  );
};

export default ConditionCheckStartModal;
