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
    products.filter((p) => p.taken).map((p) => p.activeProductId),
  );

  const handleToggleCheck = (activeProductId: number) => {
    setCheckedIdList((prev) =>
      prev.includes(activeProductId)
        ? prev.filter((id) => id !== activeProductId)
        : [...prev, activeProductId],
    );
  };

  return (
    <ModalShell onClose={onCancel} className='gap-2.5' ariaLabel='오늘 영양제, 챙겨 드셨나요?'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='typo-body-5 text-black'>오늘 영양제, 챙겨 드셨나요?</p>
        <p className='typo-caption-2 text-neutral-800'>건강한 루틴이 쌓이고 있어요!</p>
      </div>
      <CheckboxList
        list={products.map((p) => ({
          id: p.activeProductId,
          label: p.productName,
        }))}
        checkedIdList={checkedIdList}
        onToggle={handleToggleCheck}
      />
      <div className='mt-3 flex items-center gap-3'>
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
