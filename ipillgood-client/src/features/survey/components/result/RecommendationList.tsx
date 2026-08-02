import clsx from 'clsx';
import { badgeColor } from '@/features/survey/constants/result.constants';
import { BiggerBadgeIcon } from '@/assets';
import Image from 'next/image';
import vitaminImage from '@/assets/images/vitamin.png';
import { Chip } from '@/shared/components';
import { RecommendationItem } from '@/features/survey/types/recommendation';

interface RecommendationListProps {
  items: RecommendationItem[];
}

const RecommendationList = ({ items }: RecommendationListProps) => {
  return (
    <section className='space-y-2 py-4'>
      {items.map((item, index) => (
        <div
          key={item.recommendationItemId}
          className='flex w-full items-center gap-3 rounded-[20px] border-none bg-primary/30 pl-3 pr-4 py-4 no-center-glass'
        >
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

            <Image src={vitaminImage} alt={item.ingredientName} className='shrink-0' />
          </section>

          <section className='space-y-2'>
            <Chip text='추천' variant='secondary' className='h-6 typo-caption-6' />
            <article className='flex flex-col gap-1.5'>
              <p className='typo-body-5'>{item.ingredientName}</p>

              <p className='typo-caption-3 leading-4! text-neutral-900'>{item.aiReason}</p>
            </article>

            <article className='flex items-center gap-1'>
              {item.effectKeywords.map((keyword) => (
                <Chip key={keyword} text={keyword} variant='point' />
              ))}
            </article>
          </section>
        </div>
      ))}
    </section>
  );
};

export default RecommendationList;
