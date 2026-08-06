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
    <div className='relative'>
      <div className='transition hover:brightness-90 w-17.5 h-26.25 flex flex-col items-center bg-[#F5F6FF]/20 rounded-2xl  px-3 py-[8.5px]  shadow-[4px_4px_4px_0px_rgba(255,255,255,0.2),inset_4px_4px_20px_0px_rgba(155,161,255,0.2)]'>
        <div className='relative h-19 w-15'>
          <Image src={imageUrl} alt={productName} fill className='h-18 w-18 object-contain' />
        </div>
        <span
          title={productName}
          className='text-black typo-caption-6 w-11.5 truncate text-center leading-tight!'
        >
          {productName}
        </span>
      </div>
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick();
        }}
        aria-label='삭제'
        className='transition hover:brightness-90 absolute -right-0.5 -top-1 size-4 rounded-full bg-secondary text-white cursor-pointer flex items-center justify-center'
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default SupplementBottleItem;
