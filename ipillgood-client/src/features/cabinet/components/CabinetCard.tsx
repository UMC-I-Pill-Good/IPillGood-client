import Image from 'next/image';
import Link from 'next/link';
import { CabinetItem } from '../types/cabinet';
import { CheckShieldIcon } from '@/assets';

interface CabinetCardProps {
  item: CabinetItem;
}

const CabinetCard = ({ item }: CabinetCardProps) => {
  return (
    <Link
      href='/'
      className='relative flex h-35 items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)] transition hover:brightness-90'
    >
      {item.isTaking && (
        <div className='absolute -top-3 flex items-center justify-center rounded-full bg-secondary h-6 px-3 typo-caption-2 text-white'>
          섭취 중
        </div>
      )}

      <Image src={item.image} alt={item.name} className='h-fit w-23' priority />

      {item.isCertified && (
        <div className='absolute bottom-2 flex items-center justify-center gap-0.5 rounded-full bg-point-700 h-5.5 px-2 typo-caption-6 text-white'>
          <CheckShieldIcon />
          식약처
        </div>
      )}
    </Link>
  );
};

export default CabinetCard;
