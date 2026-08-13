'use client';

import { ModalShell, TextButton } from '@/shared/components';
import CheckboxList from '../CheckboxList';
import { useState } from 'react';
import { ScheduledProductType } from '../../types/intakeToday.type';

interface IntakeCheckModalProps {
  products: ScheduledProductType[];
  isConfirming: boolean;
  onCancel: () => void;
  onConfirm: (checkedIdList: number[]) => void;
}

const IntakeCheckModal = ({
  products,
  isConfirming,
  onCancel,
  onConfirm,
}: IntakeCheckModalProps) => {
  const [checkedIdList, setCheckedIdList] = useState<number[]>(() =>
    products.filter((product) => product.taken).map((product) => product.activeProductId),
  );

  const handleToggleCheck = (activeProductId: number) => {
    setCheckedIdList((previousIds) =>
      previousIds.includes(activeProductId)
        ? previousIds.filter((id) => id !== activeProductId)
        : [...previousIds, activeProductId],
    );
  };

  return (
    <ModalShell
      onClose={onCancel}
      className='max-h-[80dvh] gap-2.5 overflow-hidden!'
      ariaLabel='오늘 영양제, 챙겨 드셨나요?'
    >
      <div className='shrink-0 flex flex-col items-center justify-center gap-2'>
        <p className='typo-body-5 text-black'>오늘 영양제, 챙겨 드셨나요?</p>
        <p className='typo-caption-2 text-neutral-800'>건강한 루틴이 쌓이고 있어요!</p>
      </div>

      <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain thin-scrollbar'>
        <CheckboxList
          list={products.map((product) => ({
            id: product.activeProductId,
            label: product.productName,
          }))}
          checkedIdList={checkedIdList}
          onToggle={handleToggleCheck}
        />
      </div>

      <div className='mt-3 shrink-0 flex items-center gap-3'>
        <TextButton
          type='button'
          text='아직 안 먹었어요!'
          variant='outline'
          size='sm'
          onClick={onCancel}
          className='flex-1'
        />
        <TextButton
          type='button'
          text='섭취 완료!'
          variant='primary'
          size='sm'
          onClick={() => onConfirm(checkedIdList)}
          disabled={isConfirming || checkedIdList.length === 0}
          className='flex-1'
        />
      </div>
    </ModalShell>
  );
};

export default IntakeCheckModal;
