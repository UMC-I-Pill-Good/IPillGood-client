import Image from 'next/image';
import Link from 'next/link';
import { Omega3BottleIcon, RatingStarIcon, ValidBadgeIcon } from '@/assets';
import type { ProductSearchItemDto } from '../../types/ranking';
import IngredientNameCarousel from './IngredientNameCarousel';
import RankingBadge from './RankingBadge';

interface SupplementProductCardProps {
  item: ProductSearchItemDto;
  displayRank: number;
}
const SupplementProductCard = ({ item, displayRank }: SupplementProductCardProps) => {
  const imageUrl = item.imageUrl?.trim();
  const averageRating = item.averageRating ?? 0;
  return (
    <article className='ranking-product-card flex w-full items-center justify-center gap-3 px-5 py-4'>
      <RankingBadge rank={displayRank} />

      <div className='flex min-w-0 flex-1 items-center gap-3 overflow-visible'>
        <div className='relative flex h-[4.375rem] w-[2.6875rem] shrink-0 items-center justify-center overflow-visible'>
          {item.mfdsCertified && (
            <>
              <ValidBadgeIcon
                aria-hidden='true'
                className='absolute -left-[0.5625rem] -top-[0.78125rem] z-10 h-[1.3125rem] w-[1.375rem]'
              />
              <span className='sr-only'>식약처 인증 제품</span>
            </>
          )}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${item.productName} 상품 이미지`}
              width={43}
              height={70}
              className='h-[4.375rem] w-[2.6875rem] object-contain'
            />
          ) : (
            <Omega3BottleIcon
              aria-hidden='true'
              className='h-[4.375rem] w-[2.6875rem] overflow-visible'
            />
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex w-full flex-col gap-1'>
            <div className='flex w-full items-center justify-between gap-2'>
              <p className='min-w-0 flex-1 truncate typo-caption-6 text-black'>{item.brand}</p>
              <Link
                href={`/product/${item.productId}`}
                aria-label={`${item.productName} 더보기`}
                className='inline-flex shrink-0 items-center whitespace-nowrap typo-caption-7 text-neutral-800'
              >
                더보기
              </Link>
            </div>

            <h2 className='w-full truncate typo-body-9 text-black'>{item.productName}</h2>

            <div className='flex w-full items-center typo-caption-6 text-neutral-800'>
              <div className='flex min-w-0 items-center gap-1.5'>
                <RatingStarIcon className='size-2.5 shrink-0' aria-hidden='true' />
                <span className='min-w-0 truncate'>
                  {averageRating.toFixed(1)} ({item.reviewCount.toLocaleString('ko-KR')})
                </span>
              </div>
            </div>
          </div>

          <IngredientNameCarousel ingredientNameList={item.ingredientNames} />
        </div>
      </div>
    </article>
  );
};

export default SupplementProductCard;
