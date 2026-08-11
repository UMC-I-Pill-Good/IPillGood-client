'use client';

import { useRef, type ReactNode } from 'react';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import TextButton from '../button/TextButton';
import { cn } from '@/shared/utils';

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
        <p id='confirm-modal-title' className='text-center typo-body-9 mb-1'>
          {title}
        </p>
        <p
          id='confirm-modal-content'
          className={cn('text-center typo-caption-6 text-neutral-800', contentClassName)}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default ConfirmModal;
