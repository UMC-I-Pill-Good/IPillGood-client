import { WarningCircleIcon, WarningIcon } from '@/assets';
import { ModalShell, TextButton } from '@/shared/components';

import type { ProductPurchaseConflict } from '../../types/ranking';

interface PurchaseInteractionWarningModalProps {
  conflictList: readonly ProductPurchaseConflict[];
  onConfirm: () => void;
  onCancel: () => void;
}

const PurchaseInteractionWarningModal = ({
  conflictList,
  onConfirm,
  onCancel,
}: PurchaseInteractionWarningModalProps) => (
  <ModalShell
    onClose={onCancel}
    ariaLabel='병용 주의 처리 알림'
    className='w-88 gap-4 overflow-hidden px-10 py-8'
  >
    <section className='flex w-full flex-col items-center justify-center gap-4'>
      <div className='flex flex-col items-center gap-3'>
        <WarningIcon width={60} height={60} />
        <p className='typo-body-1'>병용 주의 처리 알림</p>
      </div>

      <p className='text-center typo-body-9 text-semantic'>
        두 성분들은 함께 복용하는 것이 <br />
        권장되지 않습니다.
      </p>

      <ul className='w-full space-y-2'>
        {conflictList.map((conflict) => (
          <li
            key={`${conflict.currentIngredientId}-${conflict.purchaseProductIngredientId}`}
            className='flex gap-2 rounded-lg bg-semantic-200 px-5 py-3'
          >
            <WarningCircleIcon className='size-6 shrink-0' />
            <div className='flex min-w-0 flex-1 flex-col gap-1 break-keep'>
              <p className='typo-body-10'>
                {conflict.purchaseIngredientName}
                {' + '}
                {conflict.currentIngredientName}
              </p>
              <p className='typo-caption-6'>{conflict.reason}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <p className='px-5 text-center typo-caption-2 text-neutral'>그래도 구매하시겠습니까?</p>

    <section className='flex w-[261px] items-center justify-center gap-3 self-center'>
      <TextButton
        type='button'
        text='취소'
        variant='semanticOutline'
        size='sm'
        onClick={onCancel}
        className='w-[124px] shadow-none'
      />
      <TextButton
        type='button'
        text='구매하기'
        variant='semantic'
        size='sm'
        onClick={onConfirm}
        className='w-[124px] shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
      />
    </section>
  </ModalShell>
);

export default PurchaseInteractionWarningModal;
