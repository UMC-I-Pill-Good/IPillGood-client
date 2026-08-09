'use client';

import { useState } from 'react';
import { IconButton, TextButton } from '@/shared/components';
import { ChevronLeft, X } from 'lucide-react';
import {
  HOURS_LIST,
  MINUTES_LIST,
} from '../../constants/conditionPopup';
import TimeWheelPicker from './TimeWheelPicker';
import ConditionCheckModalLayout from './ConditionCheckModalLayout';

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
    <ConditionCheckModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel='평균 수면 시간 선택 팝업'
      isCloseDisabled={isSubmitting}
      contentClassName='items-center justify-center gap-8'
    >
        {/* Upper Content */}
        <div className='flex w-full flex-col gap-8'>
          {/* Header - 공통 IconButton 사용 */}
          <header className='flex h-9 w-full items-center justify-between px-5'>
            <IconButton
              icon={<ChevronLeft size={24} className='text-neutral-800' />}
              ariaLabel='이전 단계로 이동'
              onClick={onBack}
              disabled={isSubmitting}
            />

            <IconButton
              icon={<X size={24} className='text-neutral-800' />}
              ariaLabel='팝업 닫기'
              onClick={onClose}
              disabled={isSubmitting}
            />
          </header>

          {/* Question & Time Wheel Section */}
          <section className='flex w-full flex-col items-center gap-5'>
            <h2 className='typo-body-5 w-full text-center text-black'>
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

                <span className='text-center text-xl font-medium leading-normal text-black'>
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

                <span className='text-center text-xl font-medium leading-normal text-black'>
                  분
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer - 공통 TextButton 사용 */}
        <div className='flex w-full flex-col px-5'>
          <TextButton
            type='button'
            text={isSubmitting ? '저장 중...' : '완료(2/2)'}
            variant='primary'
            size='md'
            className='w-full'
            onClick={handleComplete}
            disabled={isSubmitting}
          />
        </div>
    </ConditionCheckModalLayout>
  );
};

export default ConditionSleepTimeModal;
