'use client';

import { createPortal } from 'react-dom';
import { type ReactNode } from 'react';
import TextButton from '../button/TextButton';
import { cn } from '@/shared/utils';
import ModalShell from './ModalShell';

interface ConfirmModalProps {
  title: ReactNode;
  content?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  contentClassName?: string;
}

const ConfirmModal = ({
  title,
  content,
  confirmLabel = '네',
  cancelLabel = '아니요',
  onConfirm,
  onCancel,
  contentClassName,
}: ConfirmModalProps) => {
  return createPortal(
    <ModalShell
      onClose={onCancel}
      ariaLabel='확인 모달'
      className='overflow-hidden pointer-events-auto'
    >
      <p id='confirm-modal-title' className='text-center typo-body-9 mb-1'>
        {title}
      </p>
      <p
        id='confirm-modal-content'
        className={cn('text-center typo-caption-6 text-neutral-800', contentClassName)}
      >
        {content}
      </p>

      <div className='mt-4 flex items-center gap-3'>
        <TextButton
          type='button'
          text={cancelLabel}
          variant='outline'
          size='sm'
          onClick={onCancel}
          className='flex-1 shadow-none'
        />
        <TextButton
          type='button'
          text={confirmLabel}
          variant='primary'
          size='sm'
          onClick={onConfirm}
          className='flex-1 shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
        />
      </div>
    </ModalShell>,
    document.body,
  );
};

export default ConfirmModal;
