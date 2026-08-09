'use client';

import clsx from 'clsx';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { BiggerBadgeIcon } from '@/assets';
import { Chip } from '@/shared/components';
import { badgeColor } from '@/features/survey/constants/result.constants';
import { type RecommendationItem } from '@/features/survey/types/recommendation';

interface RecommendationCardProps {
  item: RecommendationItem;
  index: number;
}

const RecommendationCard = ({ item, index }: RecommendationCardProps) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  return (
    <div className='flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-[20px] border-none bg-primary/30 pl-3 pr-4 py-4 no-center-glass'>
      <section className='flex shrink-0 items-center justify-center gap-3'>
        <span
          className={clsx(
            'typo-body-2 flex items-center',
            badgeColor[(index + 1) as keyof typeof badgeColor],
          )}
        >
          <BiggerBadgeIcon />
          {item.rankNo}
        </span>

        <Image
          src={item.imageUrl}
          alt={item.ingredientName}
          width={54}
          height={54}
          className='shrink-0'
        />
      </section>

      <section className='min-w-0 flex-1 space-y-2'>
        <Chip text='추천' variant='secondary' className='h-6 typo-caption-6' />
        <article className='flex min-w-0 flex-col gap-1.5'>
          <p className='typo-body-5 wrap-break-word'>{item.ingredientName}</p>

          <p className='typo-caption-2 leading-4! text-neutral-900 wrap-break-word'>
            {item.aiReason}
          </p>
        </article>

        <div ref={emblaRef} className='overflow-hidden'>
          <article className='flex items-center gap-1'>
            {item.effectKeywords.map((keyword) => (
              <div key={keyword} className='shrink-0'>
                <Chip text={keyword} variant='point' />
              </div>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};

export default RecommendationCard;
