'use client';

import { type ReactNode, useRef } from 'react';
import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { cn } from '@/shared/utils';

interface ConditionCheckModalLayoutProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  isCloseDisabled?: boolean;
  backdropClassName?: string;
  contentClassName?: string;
}

const ConditionCheckModalLayout = ({
  isOpen,
  children,
  onClose,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  isCloseDisabled = false,
  backdropClassName,
  contentClassName,
}: ConditionCheckModalLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handleClose = isCloseDisabled ? () => {} : onClose;

  useScrollLock();
  useEscapeKey(handleClose);
  useOutsideClick(contentRef, handleClose);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5',
        backdropClassName,
      )}
      role='dialog'
      aria-modal='true'
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div
        ref={contentRef}
        className={cn(
          'flex w-[351px] flex-col rounded-[20px] border border-white bg-white py-4 shadow-[4px_4px_40px_0_rgba(126,131,135,0.2)]',
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ConditionCheckModalLayout;
