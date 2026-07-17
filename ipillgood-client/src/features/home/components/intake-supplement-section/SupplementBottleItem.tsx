'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

interface SupplementBottleItemProps {
  productName: string;
  imageUrl: string;
  onDeleteClick: () => void;
}

const SupplementBottleItem = ({
  productName,
  imageUrl,
  onDeleteClick,
}: SupplementBottleItemProps) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative '>
        <Image src={imageUrl} height={70} width={43} alt={productName} className=' h-18.5 w-auto' />
        <X
          size={13}
          onClick={onDeleteClick}
          className='absolute -right-1.5 -top-0.5 text-neutral-800 cursor-pointer'
        />
      </div>
      <span className='typo-caption-6 mr-0.5 w-11 truncate text-center'>{productName}</span>
    </div>
  );
};

export default SupplementBottleItem;
