'use client';

import { useState, type MouseEvent } from 'react';
import { ChevronLeftIcon, CloseIcon } from '@/assets';
import { useEscapeKey, useScrollLock } from '@/shared/hooks';
import {
  HOURS_LIST,
  MINUTES_LIST,
} from '../../constants/conditionPopup';
import TimeWheelPicker from './TimeWheelPicker';

interface ConditionSleepTimeModalProps {
  isOpen: boolean;
  initialHours?: number;
  initialMinutes?: number;
  isSubmitting?: boolean;
  onBack: () => void;
  onClose: () => void;
  onComplete: (sleepTime: { hours: number; minutes: number }) => void;
}

const ConditionSleepTimeModal = ({
  isOpen,
  initialHours = 7,
  initialMinutes = 30,
  isSubmitting = false,
  onBack,
  onClose,
  onComplete,
}: ConditionSleepTimeModalProps) => {
  const [selectedHour, setSelectedHour] = useState<number>(initialHours);
  const [selectedMinute, setSelectedMinute] = useState<number>(initialMinutes);

  useScrollLock();
  useEscapeKey(onClose);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleSelectHour = (hour: number) => {
    setSelectedHour(hour);
  };

  const handleSelectMinute = (minute: number) => {
    setSelectedMinute(minute);
  };

  const handleComplete = () => {
    if (isSubmitting) return;
    onComplete({ hours: selectedHour, minutes: selectedMinute });
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5'
      onClick={handleBackdropClick}
      role='presentation'
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-label='평균 수면 시간 선택 팝업'
        className='flex w-[351px] flex-col items-center justify-center gap-8 rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        onClick={handleModalClick}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {/* Upper Content */}
        <div className='flex w-full flex-col gap-8'>
          {/* Header */}
          <header className='flex h-9 w-full items-center justify-between px-5'>
            <button
              type='button'
              aria-label='이전 단계로 이동'
              className='glass flex size-9 shrink-0 items-center justify-center rounded-full border border-white p-[10px] text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] aspect-square'
              onClick={onBack}
              disabled={isSubmitting}
            >
              <ChevronLeftIcon className='h-[21px] w-[22px] shrink-0' />
            </button>

            <button
              type='button'
              aria-label='팝업 닫기'
              className='glass flex size-9 shrink-0 items-center justify-center rounded-full border border-white p-[10px] text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] aspect-square'
              onClick={onClose}
              disabled={isSubmitting}
            >
              <CloseIcon className='size-6 shrink-0' />
            </button>
          </header>

          {/* Question & Time Wheel Section */}
          <section className='flex w-full flex-col items-center gap-5'>
            <h2 className='typo-body-5 w-full text-center text-[#111111]'>
              평균 수면 시간은 얼마나 되나요?
            </h2>

            {/* Time & Minute Wheel Group */}
            <div className='flex h-24 w-full items-center justify-center gap-5'>
              {/* Hour Wheel Group */}
              <div className='flex h-24 items-center gap-1'>
                <TimeWheelPicker
                  values={HOURS_LIST}
                  selectedValue={selectedHour}
                  onSelectValue={handleSelectHour}
                  ariaLabel='수면 시간 선택'
                />

                <span className='text-center text-xl font-medium leading-normal text-[#111111]'>
                  시간
                </span>
              </div>

              {/* Minute Wheel Group */}
              <div className='flex h-24 items-center gap-1'>
                <TimeWheelPicker
                  values={MINUTES_LIST}
                  selectedValue={selectedMinute}
                  onSelectValue={handleSelectMinute}
                  ariaLabel='수면 분 선택'
                />

                <span className='text-center text-xl font-medium leading-normal text-[#111111]'>
                  분
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer CTA Button */}
        <div className='flex w-full px-5'>
          <button
            type='button'
            className='flex h-9 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-600 px-2 py-1 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] disabled:opacity-60'
            onClick={handleComplete}
            disabled={isSubmitting}
            style={{ fontFamily: 'Pretendard, sans-serif' }}
          >
            <span className='typo-body-10 text-center text-white'>
              {isSubmitting ? '저장 중...' : '완료(2/2)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConditionSleepTimeModal;
