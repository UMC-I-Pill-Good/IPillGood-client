import { WarningCircleIcon, WarningIcon } from '@/assets';
import { ProductConflict } from '@/features/cabinet/types/conflict';
import { TextButton } from '@/shared/components';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { useRef } from 'react';

interface InteractionWarningModalProps {
  conflicts: ProductConflict[];
  onConfirm: () => void;
  onCancel: () => void;
}

const InteractionWarningModal = ({
  conflicts,
  onConfirm,
  onCancel,
}: InteractionWarningModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isDuplication = conflicts.length > 1;
  const firstConflict = conflicts[0];

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
        className='flex flex-col overflow-hidden rounded-[20px] bg-white px-10 py-5 w-88'
      >
        <section className='flex flex-col items-center justify-center space-y-4'>
          {!isDuplication ? (
            <>
              <WarningIcon width={60} height={60} />

              <p className='typo-body-1'>병용 금기 처리 알림</p>

              <p className='typo-body-11 text-center break-keep'>
                현재 복용 중인{' '}
                <span className='text-primary-700 typo-body-10'>
                  [{firstConflict.currentIngredientName}]
                </span>
                과(와) 새로 추가하려는{' '}
                <span className='text-primary-700 typo-body-10'>
                  [{firstConflict.purchaseIngredientName}]
                </span>
                은 병용 시 과다 섭취 및 부작용 위험이 있어 <br />
                <span className='typo-body-10 text-semantic'>
                  함께 복용하는 것이 권장되지 않습니다.
                </span>
              </p>

              <div className='px-5 py-3 bg-semantic-200 rounded-lg flex gap-2'>
                <WarningCircleIcon className='shrink-0' />
                <div className='flex flex-col gap-1 break-keep'>
                  <p className='typo-body-10'>
                    {firstConflict.currentIngredientName} + {firstConflict.purchaseIngredientName}
                  </p>
                  <p className='typo-caption-6'>{firstConflict.reason}</p>
                </div>
              </div>

              <p className='text-center typo-caption-2 text-neutral'>그래도 추가하시겠습니까?</p>
            </>
          ) : (
            <>
              <WarningIcon width={60} height={60} />

              <p className='typo-body-1'>병용 금기 처리 알림</p>

              <p className='typo-body-9 text-center text-semantic'>
                두 성분들은 함께 복용하는 것이 <br />
                권장되지 않습니다.
              </p>

              <article className='space-y-2'>
                {conflicts.map((conflict) => (
                  <div
                    key={`${conflict.currentIngredientId}-${conflict.purchaseProductIngredientId}`}
                    className='px-5 py-3 bg-semantic-200 rounded-lg flex gap-2'
                  >
                    <WarningCircleIcon className='shrink-0' />
                    <div className='flex flex-col gap-1 break-keep'>
                      <p className='typo-body-10'>
                        {conflict.currentIngredientName} + {conflict.purchaseIngredientName}
                      </p>
                      <p className='typo-caption-6'>{conflict.reason}</p>
                    </div>
                  </div>
                ))}
              </article>

              <p className='text-center typo-caption-2 text-neutral'>그래도 추가하시겠습니까?</p>
            </>
          )}
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
            text='추가하기'
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
