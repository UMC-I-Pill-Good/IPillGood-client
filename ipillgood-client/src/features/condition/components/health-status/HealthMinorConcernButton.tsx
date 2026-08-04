'use client';

import { clsx } from 'clsx';

interface HealthMinorConcernButtonProps {
  id: string;
  label: string;
  isSelected?: boolean;
  onClick: (id: string) => void;
  className?: string;
}

const HealthMinorConcernButton = ({
  id,
  label,
  isSelected = false,
  onClick,
  className,
}: HealthMinorConcernButtonProps) => {
  return (
    <button
      type='button'
      aria-pressed={isSelected}
      onClick={() => onClick(id)}
      className={clsx(
        'inline-flex items-center justify-center rounded-xl px-3.5 py-[9px] text-[15px] font-medium leading-tight tracking-normal transition-all duration-200 cursor-pointer',
        isSelected
          ? 'bg-[#CAC0FF] text-white shadow-[0_2px_4px_0_rgba(126,131,135,0.1)]'
          : 'bg-white/70 text-black hover:bg-white',
        className,
      )}
    >
      <span>{label}</span>
    </button>
  );
};

export default HealthMinorConcernButton;
