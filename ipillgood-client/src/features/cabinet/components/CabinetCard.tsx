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
  if (mode === 'default') {
    return (
      <Link
        href='/'
        className={clsx(
          'group relative flex h-35 items-center justify-center rounded-[20px]',
          !item.isTaking && 'cursor-pointer',
        )}
      >
        <div
          className={clsx(
            'absolute inset-0 rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
            !item.isTaking && 'transition group-hover:brightness-85',
          )}
        />

        {item.isTaking && (
          <div className='absolute -top-3 z-10 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
            섭취 중
          </div>
        )}

        <Image src={item.image} alt={item.name} className='relative z-10 h-fit w-23' priority />

        {item.isCertified && (
          <div className='absolute bottom-2 z-10 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
            <CheckShieldIcon />
            식약처
          </div>
        )}
      </Link>
    );
  }

  return (
    <button
      type='button'
      onClick={onClick}
      aria-label='영양제 선택'
      className={clsx(
        'group relative flex h-35 items-center justify-center rounded-[20px]',
        (mode === 'delete' || !item.isTaking) && 'cursor-pointer',
      )}
    >
      <div
        className={clsx(
          'absolute inset-0 rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
          (mode === 'delete' || !item.isTaking) && 'transition group-hover:brightness-90',
        )}
      />

      {mode === 'add' && isSelected && (
        <div className='absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white'>
          <Check size={12} strokeWidth={3} />
        </div>
      )}

      {mode === 'delete' && (
        <>
          {item.isTaking && (
            <div className='absolute -top-3 z-10 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
              섭취 중
            </div>
          )}

          {isSelected && (
            <div className='absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-semantic text-white'>
              <Check size={12} strokeWidth={3} />
            </div>
          )}
        </>
      )}

      <Image src={item.image} alt={item.name} className='relative z-10 h-fit w-23' priority />

      {item.isCertified && (
        <div className='absolute bottom-2 z-10 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
          <CheckShieldIcon />
          식약처
        </div>
      )}
    </button>
  );
};

export default CabinetCard;
