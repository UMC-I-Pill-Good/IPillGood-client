import Image from 'next/image';
import Link from 'next/link';
import { CabinetItem } from '../types/cabinet';
import { CheckShieldIcon } from '@/assets';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CabinetCardProps {
  item: CabinetItem;
  mode: 'default' | 'add' | 'delete';
  isSelected: boolean;
  onClick: () => void;
}

const CabinetCard = ({ item, mode, isSelected, onClick }: CabinetCardProps) => {
  return mode === 'default' ? (
    <Link
      href='/'
      className={clsx(
        'relative flex h-35 items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
        !item.isTaking && 'transition hover:brightness-90',
      )}
    >
      <>
        {item.isTaking && (
          <div className='absolute -top-3 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
            섭취 중
          </div>
        )}

        {!item.isTaking && isSelected && (
          <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white'>
            <Check size={12} strokeWidth={3} />
          </div>
        )}

        <Image src={item.image} alt={item.name} className='h-fit w-23' priority />

        {item.isCertified && (
          <div className='absolute bottom-2 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
            <CheckShieldIcon />
            식약처
          </div>
        )}
      </>
    </Link>
  ) : (
    <button
      type='button'
      onClick={onClick}
      aria-label='섭취 중인 영양제 선택'
      className={clsx(
        'relative flex h-35 items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
        !item.isTaking && 'transition hover:brightness-90',
      )}
    >
      <>
        {isSelected && (
          <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white'>
            <Check size={12} strokeWidth={3} />
          </div>
        )}

        <Image src={item.image} alt={item.name} className='h-fit w-23' priority />

        {item.isCertified && (
          <div className='absolute bottom-2 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
            <CheckShieldIcon />
            식약처
          </div>
        )}
      </>
    </button>
  );
};

export default CabinetCard;
