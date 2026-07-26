'use client';

import { cn } from '@/shared/utils';

interface ToggleButtonProps {
  isChecked: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const ToggleButton = ({ isChecked, onClick, disabled }: ToggleButtonProps) => {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={isChecked}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-7 w-14 shrink-0 items-center rounded-full p-0.5 transition-colors',
        isChecked ? 'bg-primary-600' : 'bg-neutral-300',
        disabled && 'cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'h-5 w-5 rounded-full bg-white transition-transform',
          isChecked ? 'translate-x-7' : 'translate-x-1',
        )}
      />
    </button>
  );
};

export default ToggleButton;
