'use client';

import { useRef } from 'react';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { TextButton } from '@/shared/components';

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
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20 px-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='sunday-warning-title'
      aria-describedby='sunday-warning-content'
    >
      {/* Tailwind 표준 유틸리티 (rounded-2xl, px-7.5, py-6, max-w-[310px]) 적용 */}
      <div
        ref={contentRef}
        className='flex w-full max-w-[310px] flex-col items-center justify-center gap-5 rounded-2xl bg-white px-7.5 py-6 shadow-[4px_4px_40px_0_rgba(0,0,0,0.12)]'
      >
        {/* 1. 텍스트 안내 영역 (Tailwind 표준 text-base, text-xs) */}
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

        {/* 2. 하단 버튼 영역 */}
        <div className='flex w-full items-center justify-center gap-2.5'>
          <TextButton
            type='button'
            text='취소'
            variant='outline'
            size='sm'
            onClick={onClose}
            className='h-8 flex-1 rounded-lg border border-secondary-600 text-secondary-600 shadow-none hover:bg-secondary-100'
          />
          <TextButton
            type='button'
            text='계속하기'
            variant='primary'
            size='sm'
            onClick={onContinue}
            className='h-8 flex-1 rounded-lg bg-primary-600 text-white shadow-none hover:bg-primary-700'
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionSundayIntakeModal;
