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

const cardClassName = (isTaking: boolean) =>
  clsx(
    'relative flex h-35 items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]',
    !isTaking && 'transition hover:brightness-90',
  );

const CabinetCard = ({ item, mode, isSelected, onClick }: CabinetCardProps) => {
  const content = (
    <>
      {/* default, delete에서만 섭취 중 표시 */}
      {item.isTaking && (mode === 'default' || mode === 'delete') && (
        <div className='absolute -top-3 flex h-6 items-center justify-center rounded-full bg-secondary px-3 text-white typo-caption-2'>
          섭취 중
        </div>
      )}

      {/* add 모드 체크 */}
      {mode === 'add' && isSelected && (
        <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-white'>
          <Check size={12} strokeWidth={3} />
        </div>
      )}

      {/* delete 모드 체크(빨간색) */}
      {mode === 'delete' && isSelected && (
        <div className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-semantic text-white'>
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
  );

  if (mode === 'default') {
    return (
      <Link href='/' className={cardClassName(item.isTaking)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type='button'
      onClick={onClick}
      aria-label='영양제 선택'
      className={cardClassName(item.isTaking)}
    >
      {content}
    </button>
  );
};

export default CabinetCard;
