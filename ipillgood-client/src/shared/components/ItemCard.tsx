import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/shared/utils/cn';

interface ItemCardProps extends ComponentPropsWithoutRef<'div'> {
  imageSrc: string;
  title: string;
  desc: string;
}

export const ItemCard = ({
  imageSrc,
  title,
  desc,
  className,
  ...props
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        'relative flex h-30 w-18 flex-col items-center gap-1 overflow-hidden rounded-xl',
        'bg-secondary-600/25 px-2 py-2.5 text-center',
        'shadow-[0_4px_4px_0_rgba(126,131,135,0.1)] backdrop-blur-xl',
        className,
      )}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt='음식 이미지'
        className='relative z-10 h-10 w-10 shrink-0 rounded-full object-cover'
      />

      <p className='typo-caption-6 relative z-10 w-14 truncate text-[#111111]'>
        {title}
      </p>

      <p className='relative z-10 break-keep px-1 text-[10px] font-medium leading-3 text-neutral-800'>
        {desc}
      </p>
    </div>
  );
};

export default ItemCard;