'use client';

import type { ReactNode } from 'react';
import { Drawer } from 'vaul';
import { cn } from '@/shared/utils/cn';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  handleWrapperClassName?: string;
  handleClassName?: string;
}

const BottomSheet = ({
  open,
  onOpenChange,
  children,
  overlayClassName,
  contentClassName,
  handleWrapperClassName,
  handleClassName,
}: BottomSheetProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay
          className={cn('fixed inset-0 z-50 bg-neutral-800/20', overlayClassName)}
        />
        <Drawer.Content
          className={cn(
            'fixed bottom-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 rounded-t-[40px] bg-white px-5 pb-4 outline-none',
            contentClassName,
          )}
        >
          <div
            className={cn(
              'mx-auto m-2.5 flex h-1 w-38.25 items-center justify-center',
              handleWrapperClassName,
            )}
          >
            <span
              className={cn('block size-full rounded-full bg-neutral-300', handleClassName)}
            />
          </div>
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
