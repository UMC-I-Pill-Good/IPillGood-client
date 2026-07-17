'use client';

import { useEscapeKey, useOutsideClick, useScrollLock } from '@/shared/hooks';
import { useRef, type ReactNode } from 'react';

interface ModalShellProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

const ModalShell = ({ onClose, className = '', children }: ModalShellProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollLock();
  useEscapeKey(onClose);
  useOutsideClick(contentRef, onClose);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/20'>
      <div
        ref={contentRef}
        className={`flex flex-col overflow-hidden rounded-[20px] bg-white px-7.5 py-6 w-77.5 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
