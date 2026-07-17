'use client';

import { useState } from 'react';
import RatingStarIcon from '@/assets/icons/fi-rr-star.svg';
import MedicineBottleImage from '@/assets/icons/S오메가3.svg';
import { Chip } from '@/shared/components';
import type { RankingItemDto } from '../types/ranking';
import RankingBadge from './RankingBadge';

interface SupplementProductCardProps {
  item: RankingItemDto;
  displayRank: number;
}

const SupplementProductCard = ({
  item,
  displayRank,
}: SupplementProductCardProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = item.imageUrl?.trim();
  const shouldShowImage = Boolean(imageUrl) && !hasImageError;
  const ingredientTags = item.ingredientTags ?? [];
  const visibleIngredientTags = ingredientTags.slice(0, 1);

  return (
    <article className='ranking-product-card flex w-full items-center justify-center gap-3 px-5 py-4'>
      <RankingBadge rank={displayRank} />

      <div className='flex min-w-0 flex-1 items-center gap-3 overflow-visible'>
        <div className='ranking-medicine-image flex shrink-0 items-center justify-center overflow-visible'>
          {shouldShowImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={`${item.productName} 상품 이미지`}
              className='ranking-medicine-image object-contain'
              onError={() => setHasImageError(true)}
            />
          ) : (
            <MedicineBottleImage
              aria-hidden='true'
              className='ranking-medicine-image overflow-visible'
            />
          )}
        </div>

        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='flex w-full flex-col gap-1'>
            <div className='flex w-full items-center justify-between gap-2'>
              <p className='min-w-0 flex-1 truncate typo-caption-6 text-black'>
                {item.brand ?? ''}
              </p>
              <button
                type='button'
                aria-label={`${item.productName} 더보기`}
                className='inline-flex shrink-0 items-center whitespace-nowrap typo-caption-7 text-neutral-800'
              >
                더보기
              </button>
            </div>

            <h2 className='w-full truncate typo-body-9 text-black'>
              {item.productName}
            </h2>

            <div className='flex w-full items-center typo-caption-6 text-neutral-800'>
              <div className='flex min-w-0 items-center gap-1.5'>
                <RatingStarIcon
                  className='size-2.5 shrink-0'
                  aria-hidden='true'
                />
                <span className='min-w-0 truncate'>
                  {item.rating.toFixed(1)} (
                  {item.reviewCount.toLocaleString('ko-KR')})
                </span>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-between'>
            {visibleIngredientTags.map((tag) => (
              <Chip
                key={tag}
                text={tag}
                variant='point'
                className='bg-[#92E4C2]'
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SupplementProductCard;
