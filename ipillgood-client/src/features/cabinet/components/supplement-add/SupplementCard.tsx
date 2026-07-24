import Image from 'next/image';
import CheckboxButton from '@/shared/components/button/CheckboxButton';
import { SupplementItem } from '@/features/cabinet/types/supplement';
import { Chip } from '@/shared/components';
import { RatingStarIcon } from '@/assets';
import Link from 'next/link';

interface Props {
  item: SupplementItem;
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

        <Image src={item.image} alt={item.name} className='w-fit h-22.5 shrink-0' />

        <div className='w-full space-y-0.5'>
          {item.isOwned && <Chip variant='secondary' text='보유 중' className='h-6 mb-1.5' />}
          <div className='flex items-center justify-between'>
            <p className='typo-caption-6'>{item.company}</p>
            <Link href={'/'} className='typo-caption-6 text-neutral-700 transition hover:underline'>
              더보기
            </Link>
          </div>

          <p className='typo-body-9'>{item.name}</p>

          <p className='flex items-center gap-1.5 typo-caption-2 text-neutral'>
            <RatingStarIcon /> {item.rating} ({item.reviewCount})
          </p>

          <Chip text={item.ingredient} variant='point' className='mt-1 h-6 px-3' />
        </div>
      </div>
    </div>
  );
};

export default SupplementCard;
