import { BadgeIcon } from '@/assets';
import RatingStarIcon from '@/assets/icons/fi-rr-star.svg';
import MedicineImage from '@/assets/icons/S오메가3.svg';
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
    <article className='ranking-product-card relative flex w-full items-center gap-3 bg-primary-100/70 px-5 py-4 shadow-md'>
      <div className='flex h-10 w-9 shrink-0 items-center justify-start'>
        {isTopRank ? (
          <div
            className={cn(
              'flex h-10 shrink-0 items-center gap-0.5',
              rankColor,
            )}
          >
            <BadgeIcon
              aria-hidden='true'
              className='h-6 w-3.5 shrink-0 origin-center scale-[1.3] overflow-visible'
            />

            <span className='typo-body-2 leading-none'>
              {rank}
            </span>
          </div>
        ) : (
          <span
            className={cn(
              'w-full text-center typo-body-2 leading-none',
              rankColor,
            )}
          >
            {rank}
          </span>
        )}
      </div>

      <div className='ranking-medicine-image flex shrink-0 items-center justify-center overflow-visible'>
        <MedicineImage
          aria-hidden='true'
          className='ranking-medicine-image overflow-visible object-contain'
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-2 pr-16'>
        <div className='flex flex-col gap-1'>
          <p className='truncate typo-caption-2 text-neutral-800'>
            {brand}
          </p>

          <h3 className='truncate typo-body-5 text-black'>
            {name}
          </h3>

          <div className='flex items-center gap-1 typo-caption-3 text-neutral-800'>
            <RatingStarIcon
              aria-hidden='true'
              className='size-3.5 shrink-0'
            />

            <span className='whitespace-nowrap'>
              {rating.toFixed(1)} ({reviewCount.toLocaleString('ko-KR')})
            </span>
          </div>
        </div>

        <span className='inline-flex h-6 w-fit items-center rounded-full bg-point-700 px-3 typo-caption-6 text-white'>
          {tag}
        </span>
      </div>

      <button
        type='button'
        className='absolute right-5 top-4 inline-flex items-center whitespace-nowrap typo-caption-3 text-neutral-800'
      >
        더보기
      </button>
    </article>
  );
};

export default RankingProductCard;
