'use client';

import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import clsx from 'clsx';
import { useRef, type ReactNode } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

interface ModalShellProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
}

const ModalShell = ({ onClose, className = '', children, ariaLabel }: ModalShellProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  return (
    <RemoveScroll forwardProps removeScrollBar={false}>
      <div className='fixed left-1/2 top-1/2 z-50 flex h-dvh w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-neutral-800/20'>
        <div
          ref={contentRef}
          role='dialog'
          aria-modal='true'
          aria-label={ariaLabel}
          className={clsx(
            'flex w-77.5 max-h-[85dvh] flex-col overflow-y-auto rounded-[20px] bg-white px-7.5 py-6',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </RemoveScroll>
  );
};

export default ModalShell;
