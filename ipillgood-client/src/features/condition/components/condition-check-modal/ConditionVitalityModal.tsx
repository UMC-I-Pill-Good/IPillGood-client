'use client';

import { useState } from 'react';
import { IconButton, TextButton } from '@/shared/components';
import { ChevronLeft, X } from 'lucide-react';
import { VITALITY_OPTION_LIST } from '../../constants/conditionPopup';
import VitalityOptionButton from './VitalityOptionButton';
import ConditionCheckModalLayout from './ConditionCheckModalLayout';

interface ConditionVitalityModalProps {
  isOpen: boolean;
  initialScore?: number;
  onBack: () => void;
  onClose: () => void;
  onNext: (score: number) => void;
}

const ConditionVitalityModal = ({
  isOpen,
  initialScore = 3,
  onBack,
  onClose,
  onNext,
}: ConditionVitalityModalProps) => {
  const [selectedScore, setSelectedScore] = useState<number>(initialScore);

  const handleSelectScore = (score: number) => {
    setSelectedScore(score);
  };

  const handleNext = () => {
    onNext(selectedScore);
  };

  return (
    <ConditionCheckModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel='활력 선택 팝업'
      contentClassName='items-center justify-center gap-8'
    >
        <div className='flex w-full flex-col gap-8'>
          <header className='flex h-9 w-full items-center justify-between px-5'>
            <IconButton
              icon={<ChevronLeft size={24} className='text-neutral-800' />}
              ariaLabel='이전 단계로 이동'
              onClick={onBack}
            />

            <IconButton
              icon={<X size={24} className='text-neutral-800' />}
              ariaLabel='팝업 닫기'
              onClick={onClose}
            />
          </header>

          <section className='flex w-full flex-col items-center justify-center gap-6'>
            <h2 className='typo-body-5 w-full text-center text-black'>
              이번 주 전반적인 활력은 어땠나요?
            </h2>

            <div className='flex w-full items-center justify-center gap-[7px] px-5'>
              {VITALITY_OPTION_LIST.map((option) => (
                <VitalityOptionButton
                  key={option.score}
                  option={option}
                  isSelected={selectedScore === option.score}
                  onSelectScore={handleSelectScore}
                />
              ))}
            </div>
          </section>
        </div>

        <div className='flex w-full flex-col px-5'>
          <TextButton
            type='button'
            text='다음(1/2)'
            variant='primary'
            size='md'
            className='w-full'
            onClick={handleNext}
          />
        </div>
    </ConditionCheckModalLayout>
  );
};

export default ConditionVitalityModal;
