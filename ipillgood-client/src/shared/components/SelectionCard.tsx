'use client';

import Image, { type StaticImageData } from 'next/image';
import { cva } from 'class-variance-authority';
import type { ComponentType, SVGProps } from 'react';
import { cn } from '@/shared/utils/cn';

interface SelectionCardProps {
  id: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  image?: StaticImageData | string;
  isSelected: boolean;
  onClick: (id: string) => void;
  className?: string;
  hasIconBackground?: boolean;
}

const selectionCardVariants = cva(
  'group flex glass h-28 min-w-0 flex-col items-center gap-2 rounded-2xl bg-white/50 p-3 text-center transition-all hover:border-transparent hover:bg-secondary/50 active:bg-secondary/70',
  {
    variants: {
      selected: {
        true: 'border-transparent bg-secondary/50',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const iconVariants = cva(
  'flex h-[54px] w-[54px] shrink-0 items-center justify-center transition-colors',
  {
    variants: {
      selected: {
        true: '',
        false: '',
      },
      hasIconBackground: {
        true: 'rounded-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        selected: true,
        hasIconBackground: true,
        className: 'bg-secondary/30',
      },
      {
        selected: false,
        hasIconBackground: true,
        className: 'bg-secondary-200 group-hover:bg-secondary/30 group-active:bg-secondary/40',
      },
    ],
    defaultVariants: {
      selected: false,
      hasIconBackground: true,
    },
  },
);

const SelectionCard = ({
  id,
  label,
  icon: Icon,
  image,
  isSelected,
  onClick,
  className,
  hasIconBackground = true,
}: SelectionCardProps) => {
  return (
    <button
      type='button'
      aria-pressed={isSelected}
      className={cn(selectionCardVariants({ selected: isSelected }), className)}
      onClick={() => onClick(id)}
    >
      {image ? (
        <Image src={image} alt={label} className='' />
      ) : (
        <span
          className={iconVariants({
            selected: isSelected,
            hasIconBackground,
          })}
        >
          {Icon && <Icon />}
        </span>
      )}

      <span className='typo-caption-2 leading-4! whitespace-pre-line'>{label}</span>
    </button>
  );
};

export default SelectionCard;
