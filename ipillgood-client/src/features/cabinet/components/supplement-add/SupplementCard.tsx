import Image from 'next/image';
import CheckboxButton from '@/shared/components/button/CheckboxButton';
import { Chip } from '@/shared/components';
import { RatingStarIcon } from '@/assets';
import Link from 'next/link';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';

interface Props {
  item: SearchProductItem;
  checked: boolean;
  onCheck: () => void;
}

const SupplementCard = ({ item, checked, onCheck }: Props) => {
  return (
    <div className='relative no-center-glass rounded-[20px] bg-primary/30 border-none px-5 py-3'>
      <div className='flex items-center gap-3'>
        <CheckboxButton
          checked={checked}
          size='lg'
          onClick={onCheck}
          className={!checked ? 'bg-transparent' : undefined}
        />

        <div className='flex size-22.5 shrink-0 items-center justify-center overflow-hidden'>
          <Image
            src={item.thumbnailImageUrl}
            alt={item.productName}
            width={88}
            height={88}
            className='h-full w-full object-contain'
          />
        </div>

        <div className='w-full'>
          {item.isOwned && <Chip variant='secondary' text='보유 중' className='mb-1.5 h-6' />}

          <div className='mb-0.5 flex items-center justify-between'>
            <p className='typo-caption-6'>{item.brand}</p>

            <Link href={`/`} className='typo-caption-6 text-neutral-700 transition hover:underline'>
              더보기
            </Link>
          </div>

          <p className='typo-body-9'>{item.productName}</p>

          <p className='flex items-center gap-1.5 typo-caption-6 text-neutral'>
            <RatingStarIcon />
            {item.averageRating} ({item.reviewCount})
          </p>

          <div className='mt-1 flex gap-1'>
            {item.ingredientTags.map((ingredient) => (
              <Chip key={ingredient} text={ingredient} variant='point' className='h-6 px-3' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
