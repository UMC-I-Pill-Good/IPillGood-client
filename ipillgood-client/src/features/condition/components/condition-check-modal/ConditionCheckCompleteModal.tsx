'use client';

import { MascotThumbsUpIcon } from '@/assets';
import { IconButton, TextButton } from '@/shared/components';
import { X } from 'lucide-react';
import ConditionCheckModalLayout from './ConditionCheckModalLayout';

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
  return (
    <ConditionCheckModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel='컨디션 체크 완료 팝업'
      contentClassName='items-center justify-center gap-8'
    >
        {/* Header - 4단계는 제출 완료 화면이므로 우측 X 닫기 버튼만 렌더링 */}
        <header className='flex h-9 w-full items-center justify-end px-5'>
          <IconButton
            icon={<X size={24} className='text-neutral-800' />}
            ariaLabel='팝업 닫기'
            onClick={onClose}
          />
        </header>

        {/* Body Section */}
        <section className='flex w-full flex-col items-center justify-center gap-8 px-5'>
          {/* Main Visual & Sub Info (gap: 0px) */}
          <div className='flex w-full flex-col items-center gap-0'>
            {/* Title & Mascot Graphic (gap: 0px) */}
            <div className='flex w-full flex-col items-center gap-0'>
              <h2 className='typo-body-5 w-full text-center text-black'>
                이번 주 컨디션 체크 완료!
              </h2>

              <MascotThumbsUpIcon className='h-[206.525px] w-[194.07px] shrink-0' />
            </div>

            {/* Sub Info Message */}
            <p className='w-full text-center leading-normal'>
              <span className='typo-body-5 text-primary-600'>{userName}님</span>
              <span className='typo-body-10 font-normal text-neutral-800'>의</span>
              <br />
              <span className='typo-body-10 font-normal text-neutral-800'>
                월별 컨디션 변화를 확인해 보세요!
              </span>
            </p>
          </div>

          {/* CTA View Graph Button - 공통 TextButton 사용 */}
          <TextButton
            type='button'
            text='컨디션 변화 그래프 보기'
            variant='primary'
            size='md'
            className='w-full'
            onClick={onViewGraph}
          />
        </section>
    </ConditionCheckModalLayout>
  );
};

export default ConditionCheckCompleteModal;
