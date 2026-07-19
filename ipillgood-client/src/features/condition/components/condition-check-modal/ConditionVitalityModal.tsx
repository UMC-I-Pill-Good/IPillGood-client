'use client';

import { useRef, useState } from 'react';
import { IconButton, TextButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { ChevronLeft, X } from 'lucide-react';
import { VITALITY_OPTION_LIST } from '../../constants/conditionPopup';
import VitalityOptionButton from './VitalityOptionButton';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedScore, setSelectedScore] = useState<number>(initialScore);

  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  if (!isOpen) {
    return null;
  }

  const handleSelectScore = (score: number) => {
    setSelectedScore(score);
  };

  const handleNext = () => {
    onNext(selectedScore);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5'
      role='dialog'
      aria-modal='true'
      aria-label='활력 선택 팝업'
    >
      <div
        ref={contentRef}
        className='flex w-[351px] flex-col items-center justify-center gap-8 rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {/* Upper Content */}
        <div className='flex w-full flex-col gap-8'>
          {/* Header - 공통 IconButton 사용 */}
          <header className='flex h-9 w-full items-center justify-between px-5'>
            <IconButton
              icon={<ChevronLeft size={24} className='text-[#7E8387]' />}
              ariaLabel='이전 단계로 이동'
              onClick={onBack}
            />

            <IconButton
              icon={<X size={24} className='text-[#7E8387]' />}
              ariaLabel='팝업 닫기'
              onClick={onClose}
            />
          </header>

          {/* Question & Options Section */}
          <section className='flex w-full flex-col items-center justify-center gap-6'>
            <h2 className='typo-body-5 w-full text-center text-[#111111]'>
              이번 주 전반적인 활력은 어땠나요?
            </h2>

            {/* Vitality options (1 ~ 5) */}
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

        {/* Footer - 공통 TextButton 사용 */}
        <div className='flex w-full px-5'>
          <TextButton
            type='button'
            text='다음(1/2)'
            variant='primary'
            size='md'
            className='w-full'
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default ConditionVitalityModal;
