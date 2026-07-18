'use client';

import { useState, type MouseEvent } from 'react';
import { ChevronLeftIcon, CloseIcon } from '@/assets';
import { useEscapeKey, useScrollLock } from '@/shared/hooks';
import { VITALITY_OPTION_LIST } from '../../constants/conditionPopup';
import VitalityOptionButton from './VitalityOptionButton';

interface ConditionVitalityModalProps {
  isOpen: boolean;
  initialScore?: number;
  onBack: () => void;
  onClose: () => void;
  onNext: (selectedScore: number) => void;
}

const ConditionVitalityModal = ({
  isOpen,
  initialScore = 3,
  onBack,
  onClose,
  onNext,
}: ConditionVitalityModalProps) => {
  const [selectedScore, setSelectedScore] = useState<number>(initialScore);

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

  const handleSelectScore = (score: number) => {
    setSelectedScore(score);
  };

  const handleNext = () => {
    onNext(selectedScore);
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
        aria-label='이번 주 활력 선택 팝업'
        className='flex w-[351px] flex-col items-center justify-center gap-8 rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        onClick={handleModalClick}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {/* Upper Content */}
        <div className='flex w-full flex-col items-start gap-8'>
          {/* Header */}
          <header className='flex h-9 w-full items-center justify-between px-5'>
            <button
              type='button'
              aria-label='이전 단계로 이동'
              className='glass flex size-9 shrink-0 items-center justify-center rounded-full border border-white p-[10px] text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] aspect-square'
              onClick={onBack}
            >
              <ChevronLeftIcon className='h-[21px] w-[22px] shrink-0' />
            </button>

            <button
              type='button'
              aria-label='팝업 닫기'
              className='glass flex size-9 shrink-0 items-center justify-center rounded-full border border-white p-[10px] text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] aspect-square'
              onClick={onClose}
            >
              <CloseIcon className='size-6 shrink-0' />
            </button>
          </header>

          {/* Question & Rating List Section */}
          <section className='flex w-full flex-col items-center justify-center gap-5 px-5'>
            {/* Title & Description */}
            <div className='flex w-full flex-col items-center justify-center gap-1'>
              <h2 className='typo-body-5 text-center text-[#111111]'>
                이번 주 활력은 어땠나요?
              </h2>

              <p className='typo-caption-2 text-center text-neutral-800'>
                가장 가까운 점수를 선택해 주세요.
              </p>
            </div>

            {/* Score Options (1 to 5) */}
            <div className='flex w-full items-center gap-2'>
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

        {/* Footer CTA Button */}
        <div className='flex w-full px-5'>
          <button
            type='button'
            className='flex h-9 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-600 px-2 py-1 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'
            onClick={handleNext}
            style={{ fontFamily: 'Pretendard, sans-serif' }}
          >
            <span className='typo-body-10 text-center text-white'>
              다음(1/2)
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConditionVitalityModal;
