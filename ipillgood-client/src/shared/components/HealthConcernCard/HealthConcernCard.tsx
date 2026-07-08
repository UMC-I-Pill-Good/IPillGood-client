'use client';

import type { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface HealthConcernCardProps {
  id: string;
  label: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: (id: string) => void;
  disabled?: boolean;
  className?: string;
}

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const cardDefaultClassName =
  'flex h-[110px] w-[81px] flex-col items-center justify-center gap-[8px] rounded-[8px] border border-white bg-white/50 px-4 py-5 text-center text-slate-900 transition-all';
const cardHoveredClassName = 'hover:border-transparent hover:bg-secondary-600/30';
const cardPressedClassName = 'active:bg-secondary-600/70';
const cardSelectedClassName = 'border-transparent bg-secondary-600/30';
const cardDisabledClassName =
  'disabled:scale-100 disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 disabled:shadow-none disabled:hover:border-slate-200 disabled:hover:bg-slate-50';

const iconClassName =
  'flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-secondary-200 transition-colors';

const HealthConcernCard = ({
  id,
  label,
  icon,
  isSelected,
  onClick,
  disabled = false,
  className,
}: HealthConcernCardProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      disabled={disabled}
      className={cn(
        cardDefaultClassName,
        cardHoveredClassName,
        cardPressedClassName,
        cardDisabledClassName,
        isSelected && cardSelectedClassName,
        className,
      )}
      onClick={() => onClick(id)}
    >
      <span
        className={iconClassName}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="flex h-[17px] w-[75px] items-center justify-center text-[14px] font-medium leading-[17px] break-keep whitespace-normal [font-family:var(--font-pretendard)]">
        {label}
      </span>
    </button>
  );
};

export default HealthConcernCard;
