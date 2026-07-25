import { EmptyBottleIcon } from '@/assets';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyCabinetCardProps {
  mode: 'default' | 'add' | 'delete';
}

const EmptyCabinetCard = ({ mode }: EmptyCabinetCardProps) => {
  return mode === 'default' ? (
    <Link
      href='/cabinet/supplement-add'
      className='flex items-center justify-center rounded-[20px] transition hover:brightness-90 py-3 bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]'
    >
      <div className='relative translate-y-1'>
        <EmptyBottleIcon className='mb-2 text-[#D7D7D7]' />
        <div className='absolute top-11 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-1 text-neutral-800'>
          <Plus size={16} />
        </div>
      </div>
    </Link>
  ) : (
    <div className='flex items-center justify-center rounded-[20px] bg-[#F5F6FF]/20 shadow-[inset_4px_4px_20px_rgba(155,161,255,0.2),4px_4px_4px_rgba(255,255,255,0.2)]' />
  );
};

export default EmptyCabinetCard;
