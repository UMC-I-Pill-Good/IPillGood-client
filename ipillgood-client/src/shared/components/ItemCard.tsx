import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ItemCardProps extends ComponentPropsWithoutRef<'div'> {
  imageSrc: string;
  foodName: string;
  desc: string;
}

export const ItemCard = ({
  imageSrc,
  foodName,
  desc,
  className,
  ...props
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        'relative flex h-30 w-18 flex-col items-center gap-1 overflow-hidden rounded-xl bg-secondary-600/25 px-2 py-2.5 text-center shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-[24px] backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-[linear-gradient(135deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.05)_100%)]',
        className,
      )}
      {...props}
    >
      <img
        src={imageSrc}
        alt='음식 이미지'
        className='relative z-10 h-10 w-10 shrink-0 rounded-full object-cover'
      />

      <p className='typo-caption-6 relative z-10 w-14 truncate text-neutral-900'>
        {foodName}
      </p>

      <p className='relative z-10 break-keep px-1 text-[10px] font-medium leading-3 text-neutral-800'>
        {desc}
      </p>
    </div>
  );
};

export default ItemCard;