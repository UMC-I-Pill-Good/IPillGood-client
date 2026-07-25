import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { useRef } from 'react';

interface IntakeTimeModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const IntakeTimeModal = ({ onConfirm, onCancel }: IntakeTimeModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

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
        className='flex flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6 w-77.5'
      ></div>
    </div>
  );
};

export default IntakeTimeModal;
