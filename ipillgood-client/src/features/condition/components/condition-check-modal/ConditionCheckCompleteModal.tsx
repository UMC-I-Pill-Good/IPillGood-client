'use client';

import { type MouseEvent } from 'react';
import { CloseIcon, MascotThumbsUpIcon } from '@/assets';
import { useEscapeKey, useScrollLock } from '@/shared/hooks';

interface ConditionCheckCompleteModalProps {
  isOpen: boolean;
  userName?: string;
  onClose: () => void;
  onViewGraph: () => void;
}

const ConditionCheckCompleteModal = ({
  isOpen,
  userName = '00',
  onClose,
  onViewGraph,
}: ConditionCheckCompleteModalProps) => {
  useScrollLock();
  useEscapeKey(onClose);

  if (!isOpen) {
    return null;
  }

  // 바깥 배경 클릭 시 팝업 닫힘
  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
        aria-label='컨디션 체크 완료 팝업'
        className='flex w-[351px] flex-col items-center justify-center gap-8 rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]'
        onClick={handleModalClick}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {/* Header: 완료 모달이므로 이전 버튼 없이 닫기(X) 버튼만 우측 배치 */}
        <header className='flex h-9 w-full items-center justify-end px-5'>
          <button
            type='button'
            aria-label='팝업 닫기'
            className='glass flex size-9 shrink-0 items-center justify-center rounded-full border border-white p-[10px] text-neutral-800 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] aspect-square'
            onClick={onClose}
          >
            <CloseIcon className='size-6 shrink-0 text-[#7E8387]' />
          </button>
        </header>

        {/* Body Section */}
        <section className='flex w-full flex-col items-center justify-center gap-8 px-5'>
          {/* Main Visual & Sub Info (gap: 0px) */}
          <div className='flex w-full flex-col items-center gap-0'>
            {/* Title & Mascot Graphic (gap: 0px) */}
            <div className='flex w-full flex-col items-center gap-0'>
              <h2 className='typo-body-5 w-full text-center text-[#111111]'>
                이번 주 컨디션 체크 완료!
              </h2>

              <MascotThumbsUpIcon className='h-[206.525px] w-[194.07px] shrink-0' />
            </div>

            {/* Sub Info Message */}
            <p className='w-full text-center leading-normal'>
              {/* 00님: Pretendard 18px Medium #7F99FF */}
              <span className='typo-body-5 text-primary-600'>{userName}님</span>
              {/* 조사 '의': Pretendard 16px Regular #7E8387 */}
              <span className='typo-body-10 font-normal text-neutral-800'>의</span>
              <br />
              {/* 안내 문장: Pretendard 16px Regular #7E8387 */}
              <span className='typo-body-10 font-normal text-neutral-800'>
                월별 컨디션 변화를 확인해 보세요!
              </span>
            </p>
          </div>

          {/* CTA View Graph Button */}
          <button
            type='button'
            className='flex h-9 w-full items-center justify-center gap-2.5 rounded-lg bg-primary-600 px-2 py-1 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'
            onClick={onViewGraph}
            style={{ fontFamily: 'Pretendard, sans-serif' }}
          >
            <span className='typo-body-10 text-center text-white'>
              컨디션 변화 그래프 보기
            </span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConditionCheckCompleteModal;
