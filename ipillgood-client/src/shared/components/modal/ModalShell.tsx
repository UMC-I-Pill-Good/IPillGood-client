'use client';

import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { cn } from '@/shared/utils';
import { useRef, type ReactNode } from 'react';

interface ModalShellProps {
  onClose: () => void;
  className?: string;
  overlayClassName?: string;
  children: ReactNode;
  ariaLabel: string;
}

const ModalShell = ({
  onClose,
  className,
  overlayClassName,
  children,
  ariaLabel,
}: ModalShellProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20',
        overlayClassName,
      )}
    >
      <div
        ref={contentRef}
        role='dialog'
        aria-modal='true'
        aria-label={ariaLabel}
        className={cn(
          'flex w-77.5 flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
