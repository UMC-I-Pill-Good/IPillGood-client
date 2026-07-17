'use client';

import { useRef, type ReactNode } from 'react';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import TextButton from '../button/TextButton';

interface ConfirmModalProps {
  title: ReactNode;
  content?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  content,
  confirmLabel = '네',
  cancelLabel = '아니요',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollLock();
  useEscapeKey(onCancel);
  useOutsideClick(contentRef, onCancel);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20'
      role='dialog'
      aria-modal='true'
      aria-labelledby='confirm-modal-title'
      aria-describedby='confirm-modal-content'
    >
      <div
        ref={contentRef}
        className='flex flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6 w-77.5'
      >
        <p id='confirm-modal-title' className='text-center typo-body-9 mb-2'>
          {title}
        </p>
        <p id='confirm-modal-content' className='text-center typo-caption-6 text-neutral-800'>
          {content}
        </p>

        <div className='mt-5 flex items-center gap-3'>
          <TextButton
            type='button'
            text={cancelLabel}
            variant='outline'
            size='sm'
            onClick={onCancel}
            className='flex-1'
          />
          <TextButton
            type='button'
            text={confirmLabel}
            variant='primary'
            size='sm'
            onClick={onConfirm}
            className='flex-1'
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
