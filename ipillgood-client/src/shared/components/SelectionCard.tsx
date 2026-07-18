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
}

const selectionCardVariants = cva(
  'group flex glass h-28 min-w-0 flex-col items-center gap-2 rounded-2xl bg-white/50 px-3 py-3 text-center transition-all hover:border-transparent hover:bg-secondary/50 active:bg-secondary/70',
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
  'flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full transition-colors',
  {
    variants: {
      selected: {
        true: 'bg-secondary/30',
        false: 'bg-secondary-200 group-hover:bg-secondary/30 group-active:bg-secondary/40',
      },
    },
    defaultVariants: {
      selected: false,
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
        <span className={iconVariants({ selected: isSelected })} aria-hidden='true'>
          {Icon && <Icon />}
        </span>
      )}

      <span className='typo-caption-2 leading-4! flex min-w-0 items-center justify-center break-keep text-center whitespace-normal'>
        {label}
      </span>
    </button>
  );
};

export default SelectionCard;
