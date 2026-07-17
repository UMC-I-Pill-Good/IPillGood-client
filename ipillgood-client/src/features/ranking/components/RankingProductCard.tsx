import { ChevronRight, Star } from 'lucide-react';
import { BadgeIcon } from '@/assets';
import MedicineImage from '@/assets/icons/S오메가3.svg';
import { cn } from '@/shared/utils/cn';

interface RankingProductCardProps {
  rank: number;
  brand: string;
  name: string;
  rating: number;
  reviewCount: number;
  tag: string;
}

const rankColorClassName: Record<number, string> = {
  1: 'text-primary-500',
  2: 'text-point-700',
  3: 'text-secondary-600',
};

const RankingProductCard = ({
  rank,
  brand,
  name,
  rating,
  reviewCount,
  tag,
}: RankingProductCardProps) => {
  const isTopRank = rank <= 3;
  const rankColor = isTopRank
    ? rankColorClassName[rank]
    : 'text-neutral-800';

  return (
    <article className='relative flex h-[123px] w-full items-center gap-3 rounded-[20px] bg-primary-100/70 px-5 py-4 shadow-[4px_4px_12px_0_rgba(93,144,255,0.08)]'>
      <div className='flex h-10 w-[34px] shrink-0 items-center justify-start'>
        {isTopRank ? (
          <div
            className={cn(
              'flex h-10 shrink-0 items-center gap-[2px]',
              rankColor,
            )}
          >
            <BadgeIcon
              aria-hidden='true'
              className='h-6 w-[14px] shrink-0 origin-center scale-[1.3] overflow-visible fill-current stroke-current'
            />

            <span className='text-[20px] font-medium leading-none'>
              {rank}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              'w-full text-center text-[20px] font-medium leading-none',
              rankColor,
            )}
          >
            {rank}
          </span>
        )}
      </div>

      <div className='flex h-[70px] w-[43px] shrink-0 items-center justify-center'>
        <MedicineImage
          aria-hidden='true'
          className='h-[70px] w-[43px] object-contain'
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col pr-16'>
        <p className='truncate typo-caption-2 text-neutral-800'>
          {brand}
        </p>

        <h3 className='mt-1 truncate typo-body-5 text-[#111111]'>
          {name}
        </h3>

        <div className='mt-2 flex items-center gap-1 typo-caption-3 text-neutral-800'>
          <Star
            aria-hidden='true'
            className='size-[14px] shrink-0 fill-primary-500 text-primary-500'
          />

          <span className='whitespace-nowrap'>
            {rating.toFixed(1)} ({reviewCount.toLocaleString('ko-KR')})
          </span>
        </div>

        <span className='mt-[10px] inline-flex h-6 w-fit items-center rounded-full bg-point-700 px-3 typo-caption-6 text-white'>
          {tag}
        </span>
      </div>

      <button
        type='button'
        className='absolute right-5 top-4 inline-flex items-center gap-1 whitespace-nowrap typo-caption-3 text-neutral-800'
      >
        더보기
        <ChevronRight aria-hidden='true' className='size-4' />
      </button>
    </article>
  );
};

export default RankingProductCard;
