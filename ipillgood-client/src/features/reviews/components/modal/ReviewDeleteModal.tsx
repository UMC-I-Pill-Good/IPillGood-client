'use client';

import { createPortal } from 'react-dom';
import { ModalShell, TextButton } from '@/shared/components';

interface ReviewDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ReviewDeleteModal = ({ onConfirm, onCancel }: ReviewDeleteModalProps) => {
  return createPortal(
    <ModalShell
      onClose={onCancel}
      ariaLabel='후기 삭제 확인'
      className='border border-white shadow-[4px_4px_40px_rgba(126,131,135,0.16)]'
    >
      <p className='mb-2 text-center typo-body-9 text-black'>
        작성한 후기를 정말 삭제하시겠습니까?
      </p>
      <p className='text-center typo-caption-6 text-semantic-600'>
        작성한 후기는 복구가 어렵습니다.
      </p>
      <div className='mt-5 flex items-center gap-2.5'>
        <TextButton
          text='예'
          variant='semanticOutline'
          size='sm'
          onClick={onConfirm}
          className='flex-1'
        />
        <TextButton
          text='아니요'
          variant='semantic'
          size='sm'
          onClick={onCancel}
          className='flex-1'
        />
      </div>
    </ModalShell>,
    document.body,
  );
};

export default ReviewDeleteModal;
