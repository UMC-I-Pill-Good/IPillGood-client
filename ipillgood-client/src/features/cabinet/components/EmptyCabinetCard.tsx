import { EmptyBottleIcon } from '@/assets';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyCabinetCardProps {
  key: number;
}

const EmptyCabinetCard = ({ key }: EmptyCabinetCardProps) => {
  return (
    <Link
      key={`empty-${key}`}
      href='/cabinet/supplement-add'
      className='flex items-center justify-center rounded-[20px] transition hover:brightness-90 bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]'
    >
      <div className='relative translate-y-1'>
        <EmptyBottleIcon className='mb-2 text-[#D7D7D7]' />
        <div className='absolute left-1/2 -translate-x-1/2 top-11 flex flex-col items-center justify-center text-neutral-800 gap-1'>
          <Plus size={16} />
        </div>
      </div>
    </Link>
  );
};

export default EmptyCabinetCard;
