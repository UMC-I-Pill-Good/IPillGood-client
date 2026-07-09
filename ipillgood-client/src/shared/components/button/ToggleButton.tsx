'use client';

import { cn } from '@/shared/utils';

interface ToggleButtonProps {
  isChecked: boolean;
  onClick?: () => void;
}

const ToggleButton = ({ isChecked, onClick }: ToggleButtonProps) => {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={isChecked}
      onClick={onClick}
      className={cn(
        'inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors',
        isChecked ? 'bg-[#4680FE]' : 'bg-neutral-300',
      )}
    >
      <span
        className={cn(
          'h-5 w-5 rounded-full bg-white transition-transform',
          isChecked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
};

export default ToggleButton;
