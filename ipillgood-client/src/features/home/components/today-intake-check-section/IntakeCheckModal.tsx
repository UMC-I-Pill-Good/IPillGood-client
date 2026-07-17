'use client';

import { TextButton } from '@/shared/components';
import CheckboxList from '../CheckboxList';
import ModalShell from '../ModalShell';
import { useIntakeCheck } from '../../hooks/useIntakeCheck';

interface IntakeCheckModalProps {
  onCancel: () => void;
  onConfirm: (checkedIdList: number[]) => void;
}

const IntakeCheckModal = ({ onCancel, onConfirm }: IntakeCheckModalProps) => {
  const { list, checkedIdList, handleToggleCheck } = useIntakeCheck();

  return (
    <ModalShell onClose={onCancel} className='gap-2.5'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='typo-body-5 text-[#111]'>오늘 영양제, 챙겨 드셨나요?</p>
        <p className='typo-caption-2 text-neutral-800'>건강한 루틴이 쌓이고 있어요!</p>
      </div>
      <CheckboxList
        list={list.map((s) => ({
          id: s.userSupplementId,
          label: s.productName,
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
          className='flex-1'
        />
      </div>
    </ModalShell>
  );
};

export default IntakeCheckModal;
