import { WarningCircleIcon, WarningIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { useRef } from 'react';

interface InteractionWarningModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const InteractionWarningModal = ({ onConfirm, onCancel }: InteractionWarningModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20'
      role='dialog'
      aria-modal='true'
    >
      <div
        ref={contentRef}
        className='flex flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6 w-88'
      >
        <section className='flex flex-col items-center justify-center space-y-4'>
          <WarningIcon width={60} heigt={60} />

          <p className='typo-body-1'>병용 금기 처리 알림</p>

          <p className='typo-body-11 text-center'>
            현재 복용 중인 <span className='text-primary-700 typo-body-10'>[철분]</span>과(와){' '}
            <br />
            새로 추가하려는 <span className='text-primary-700 typo-body-10'>
              [종합비타민]
            </span>은 <br />
            병용 시 과다 섭취 및 부작용 위험이 있어 <br />
            <span className='typo-body-10 text-semantic'>
              함께 복용하는 것이 권장되지 않습니다.
            </span>
          </p>

          <div className='px-5 py-3 bg-semantic-200 rounded-lg flex gap-2'>
            <WarningCircleIcon className='shrink-0' />
            <div className='flex flex-col gap-1 break-keep'>
              <p className='typo-body-10'>철분 + 종합비타민</p>
              <p className='typo-caption-6'>철분 과다 섭취 위험, 위장 장애, 변비 유발 가능</p>
            </div>
          </div>

          <p className='text-center typo-caption-2 text-neutral'>그래도 삭제하시겠습니까?</p>
        </section>
        <section className='mt-5 flex items-center gap-3'>
          <TextButton
            type='button'
            text='취소'
            variant='semanticOutline'
            size='sm'
            onClick={onCancel}
            className='flex-1 shadow-none'
          />
          <TextButton
            type='button'
            text='삭제하기'
            variant='semantic'
            size='sm'
            onClick={onConfirm}
            className='flex-1 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
          />
        </section>
      </div>
    </div>
  );
};

export default InteractionWarningModal;
