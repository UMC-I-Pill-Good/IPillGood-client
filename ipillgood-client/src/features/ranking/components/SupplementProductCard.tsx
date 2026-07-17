'use client';

import { ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';
import MedicineBottleImage from '@/assets/icons/S오메가3.svg';
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
    <article className='flex h-[123px] w-full items-center justify-center gap-3 rounded-[20px] bg-primary-600/20 px-5 py-4'>
      <RankingBadge rank={displayRank} />

      <div className='flex h-[70px] w-[43px] shrink-0 items-center justify-center overflow-hidden'>
        {shouldShowImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`${item.productName} 상품 이미지`}
            className='h-[70px] w-[43px] object-contain'
            onError={() => setHasImageError(true)}
          />
        ) : (
          <MedicineBottleImage
            aria-hidden='true'
            className='h-[70px] w-[43px]'
          />
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <div className='flex w-full items-center justify-between gap-2'>
          <p className='typo-caption-6 min-w-0 truncate text-[#111111]'>
            {item.brand ?? ''}
          </p>
          <button
            type='button'
            aria-label={`${item.productName} 더보기`}
            className='inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap typo-caption-7 text-[#8a949e]'
          >
            더보기
            <ChevronRight size={14} aria-hidden='true' />
          </button>
        </div>

        <h2 className='typo-body-9 truncate text-[#111111]'>
          {item.productName}
        </h2>

        <div className='flex w-full flex-col gap-[10px]'>
          <div className='flex items-center gap-1.5 typo-caption-6 text-neutral-800'>
            <Star
              size={10}
              className='fill-primary-500 text-primary-500'
              aria-hidden='true'
            />
            <span>
              {item.rating.toFixed(1)} (
              {item.reviewCount.toLocaleString('ko-KR')})
            </span>
          </div>

          {visibleIngredientTags.map((tag) => (
            <Chip key={tag} text={tag} variant='point' />
          ))}
        </div>
      </div>
    </article>
  );
};

export default SupplementProductCard;
