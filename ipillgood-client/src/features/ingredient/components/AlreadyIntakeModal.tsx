import { IconButton, ModalShell, TextButton } from '@/shared/components';
import { X } from 'lucide-react';

interface AlreadyInIntakeModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const AlreadyInIntakeModal = ({ onClose, onConfirm }: AlreadyInIntakeModalProps) => {
  return (
    <ModalShell onClose={onClose} ariaLabel='이미 섭취 중인 영양제' className='relative'>
      <IconButton
        icon={<X size={22} />}
        ariaLabel='닫기'
        onClick={onClose}
        className='absolute right-2 top-2'
      />
      <div className='flex flex-col gap-2 justify-center items-center mt-5'>
        <p className='typo-body-9 text-black'>이미 섭취 중인 영양제에 존재해요!</p>
        <p className='typo-caption-6 text-neutral-800 text-center whitespace-pre-line leading-4!'>
          해당 영양제는 이미 섭취 중인 영양제에{'\n'}추가되어 있어요.
        </p>
      </div>

      <TextButton
        type='button'
        text='캐비닛에서 확인하기'
        variant='primary'
        size='lg'
        onClick={onConfirm}
        className='w-full mt-5'
      />
    </ModalShell>
  );
};

export default AlreadyInIntakeModal;
