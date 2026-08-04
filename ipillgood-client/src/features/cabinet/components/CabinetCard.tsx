import Image from 'next/image';
import { CheckShieldIcon } from '@/assets';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { ProductItem } from '../types/cabinet';
import { memo } from 'react';

interface CabinetCardProps {
  item: ProductItem;
  mode: 'default' | 'add' | 'delete';
  isSelected: boolean;
  onClick: (item: ProductItem) => void;
}

const CabinetCard = ({ item, mode, isSelected, onClick }: CabinetCardProps) => {
  if (mode === 'default') {
    return (
      <button
        type='button'
        onClick={() => onClick(item)}
        aria-label='알림 설정 바텀시트 열기'
        aria-pressed={isSelected}
        className='group relative flex h-35 items-center justify-center rounded-[20px]'
      >
        <div className='absolute inset-0 rounded-[20px] transition group-hover:brightness-85 bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]' />

        {item.isActiveIntake && (
          <div className='absolute -top-3 z-10 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
            섭취 중
          </div>
        )}

        <Image
          src={item.thumbnailImageUrl}
          alt={item.productName}
          width={80}
          height={80}
          className='relative z-10 w-20 h-27.5 ml-1'
          preload
        />

        {item.mfdsCertified && (
          <div className='absolute bottom-2 z-10 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
            <CheckShieldIcon />
            식약처
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      type='button'
      onClick={() => onClick(item)}
      aria-label='영양제 선택'
      className={clsx(
        'group relative flex h-35 items-center justify-center rounded-[20px]',
        (mode === 'delete' || !item.isActiveIntake) && 'cursor-pointer',
      )}
    >
      <div
        className={clsx(
          'absolute inset-0 rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
          (mode === 'delete' || !item.isActiveIntake) && 'transition group-hover:brightness-85',
        )}
      />

      {mode === 'add' && (
        <>
          {item.isActiveIntake ? (
            <div className='absolute -top-3 z-10 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
              섭취 중
            </div>
          ) : (
            isSelected && (
              <div className='absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white'>
                <Check size={12} strokeWidth={3} />
              </div>
            )
          )}
        </>
      )}

      {mode === 'delete' && (
        <>
          {item.isActiveIntake && (
            <div className='absolute -top-3 z-10 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
              섭취 중
            </div>
          )}

          {isSelected && (
            <div className='absolute no-center-glass border-none -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-semantic text-white'>
              <Check size={12} strokeWidth={3} />
            </div>
          )}
        </>
      )}

      <Image
        src={item.thumbnailImageUrl}
        alt={item.productName}
        width={80}
        height={80}
        className='relative z-10 w-20 h-27.5 ml-1'
        preload
      />

      {item.mfdsCertified && (
        <div className='absolute bottom-2 z-10 flex h-5.5 items-center justify-center gap-0.5 rounded-full bg-point-700 px-2 text-white typo-caption-6'>
          <CheckShieldIcon />
          식약처
        </div>
      )}
    </button>
  );
};

export default memo(CabinetCard);
