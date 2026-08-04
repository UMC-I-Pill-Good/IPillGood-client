import Image from 'next/image';
import CheckboxButton from '@/shared/components/button/CheckboxButton';
import { Chip } from '@/shared/components';
import { RatingStarIcon } from '@/assets';
import Link from 'next/link';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';
import { memo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface Props {
  item: SearchProductItem;
  checked: boolean;
  onCheck: () => void;
}

const SupplementCard = ({ item, checked, onCheck }: Props) => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  return (
    <div className='relative no-center-glass rounded-[20px] bg-primary/30 border-none px-5 py-3'>
      <div className='flex items-center'>
        {!item.isOwned && (
          <CheckboxButton
            checked={checked}
            size='lg'
            onClick={onCheck}
            className={!checked ? 'bg-transparent' : undefined}
          />
        )}

        <div className='flex size-18 shrink-0 items-center justify-center overflow-hidden'>
          <Image
            src={item.thumbnailImageUrl}
            alt={item.productName}
            width={72}
            height={72}
            className='h-full w-full object-contain'
          />
        </div>

        <div className='min-w-0 flex-1'>
          {item.isOwned && <Chip variant='secondary' text='보유 중' className='mb-1.5 h-6' />}

          <div className='mb-0.5 flex items-center justify-between'>
            <p className='typo-caption-6 line-clamp-1'>{item.brand}</p>

            <Link
              href={`/product/${item.productId}`}
              className='typo-caption-7 text-neutral-700 transition hover:underline'
            >
              더보기
            </Link>
          </div>

          <p className='typo-body-9 line-clamp-2 wrap-break-word'>{item.productName}</p>

          <p className='flex items-center gap-1.5 typo-caption-6 text-neutral'>
            <RatingStarIcon />
            {item.averageRating} ({item.reviewCount})
          </p>

          <div ref={emblaRef} className='mt-1 overflow-hidden'>
            <div className='flex gap-1'>
              {item.ingredientTags.map((ingredient) => (
                <div key={ingredient} className='shrink-0'>
                  <Chip text={ingredient} variant='point' className='h-6 px-3' />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SupplementCard);
