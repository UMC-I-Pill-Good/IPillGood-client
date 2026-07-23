import Image from 'next/image';
import Link from 'next/link';
import { CabinetItem } from '../types/cabinet';

interface CabinetCardProps {
  item: CabinetItem;
}

const CabinetCard = ({ item }: CabinetCardProps) => {
  return (
    <Link
      href='/'
      className='flex items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 h-35 transition hover:brightness-90 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]'
    >
      <Image src={item.image} alt={item.name} className='h-fit w-23' priority />
    </Link>
  );
};

export default CabinetCard;
