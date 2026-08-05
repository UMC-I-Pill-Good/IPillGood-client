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
      <div className='flex items-start'>
        <div className='relative h-19 w-12 shrink-0'>
          <Image src={imageUrl} fill alt={productName} className='object-contain' />
        </div>
        <button
          type='button'
          onClick={onDeleteClick}
          aria-label='삭제'
          className='text-neutral-800 cursor-pointer'
        >
          <X size={16} />
        </button>
      </div>
      <span title={productName} className='typo-caption-6 mr-0.5 w-14 truncate text-center'>
        {productName}
      </span>
    </div>
  );
};

export default SupplementBottleItem;
