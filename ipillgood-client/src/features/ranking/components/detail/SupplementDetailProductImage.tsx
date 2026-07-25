'use client';

import { useState } from 'react';
import { Omega3BottleIcon } from '@/assets';

interface SupplementDetailProductImageProps {
  imageKey: string | null;
  productName: string;
}

const SupplementDetailProductImage = ({
  imageKey,
  productName,
}: SupplementDetailProductImageProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(imageKey?.trim()) && !hasImageError;

  if (!shouldShowImage) {
    return (
      <div className='relative flex h-[90px] w-[60px] shrink-0 items-center justify-center overflow-visible'>
        <Omega3BottleIcon aria-hidden='true' className='h-[80px] w-[54px] overflow-visible' />
      </div>
    );
  }

  return (
    <div className='relative flex h-[90px] w-[60px] shrink-0 items-center justify-center overflow-visible'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageKey ?? undefined}
        alt={`${productName} 상품 이미지`}
        className='h-[80px] w-[54px] object-contain'
        onError={() => setHasImageError(true)}
      />
    </div>
  );
};

export default SupplementDetailProductImage;
