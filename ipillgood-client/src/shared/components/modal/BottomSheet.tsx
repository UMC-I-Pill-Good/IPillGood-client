'use client';

import { Drawer } from 'vaul';

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const BottomSheet = ({ open, onOpenChange, children }: BottomSheetProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 z-50 bg-neutral-800/20' />
        <Drawer.Content className='fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-110 rounded-t-[40px] bg-white outline-none px-5 pb-4'>
          <div className='mx-auto m-2.5 h-1 w-38.25 rounded-full bg-neutral-300' />
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default BottomSheet;
