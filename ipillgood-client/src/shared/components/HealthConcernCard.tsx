'use client';

import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface HealthConcernCardProps {
  id: string;
  label: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: (id: string) => void;
  className?: string;
}

const healthConcernCardVariants = cva(
  'flex h-28 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white bg-white/50 px-3 py-3 text-center text-slate-900 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-xl transition-all hover:border-transparent hover:bg-secondary-600/30 active:bg-secondary-600/70',
  {
    variants: {
      selected: {
        true: 'border-transparent bg-secondary-600/30',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const iconClassName =
  'flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-secondary-200 text-secondary-600 transition-colors';

const HealthConcernCard = ({
  id,
  label,
  icon,
  isSelected,
  onClick,
  className,
}: HealthConcernCardProps) => {
  return (
    <button
      type='button'
      aria-pressed={isSelected}
      className={cn(healthConcernCardVariants({ selected: isSelected }), className)}
      onClick={() => onClick(id)}
    >
      <span className={iconClassName} aria-hidden='true'>
        {icon}
      </span>
      <span className='typo-caption-2 flex min-w-0 items-center justify-center break-keep text-center whitespace-normal'>
        {label}
      </span>
    </button>
  );
};

export default HealthConcernCard;
