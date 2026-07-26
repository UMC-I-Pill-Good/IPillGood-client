import { recommendations } from '@/features/survey/mocks/result.mocks';
import clsx from 'clsx';
import { badgeColor } from '@/features/survey/constants/result.constants';
import { BiggerBadgeIcon } from '@/assets';
import Image from 'next/image';
import vitaminImage from '@/assets/images/vitamin.png';
import { Chip } from '@/shared/components';

const RecommendationList = () => {
  return (
    <section className='space-y-2 py-4'>
      {recommendations.map((item, index) => (
        <div
          key={item.id}
          className='flex w-full items-center gap-3 rounded-[20px] border-none bg-primary/30 px-3 py-4 no-center-glass'
        >
          <section className='flex shrink-0 items-center justify-center gap-3'>
            <span
              className={clsx(
                'typo-body-2 flex items-center',
                badgeColor[(index + 1) as keyof typeof badgeColor],
              )}
            >
              <BiggerBadgeIcon />
              {index + 1}
            </span>

            <Image src={vitaminImage} alt={item.name} className='shrink-0' />
          </section>

          <section className='space-y-2'>
            <article className='flex flex-col gap-1.5'>
              <p className='typo-body-5'>{item.name}</p>

              <p className='typo-body-10 text-primary-700'>추천 이유</p>

              <p className='typo-caption-3 leading-4! text-neutral-900'>{item.reason}</p>
            </article>

            <article className='flex items-center gap-1'>
              {item.chips.map((chip) => (
                <Chip key={chip} text={chip} variant='point' />
              ))}
            </article>
          </section>
        </div>
      ))}
    </section>
  );
};

export default RecommendationList;
