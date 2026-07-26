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
      <div className='relative flex h-17.5 w-10.75 shrink-0 items-center justify-center overflow-visible'>
        <Omega3BottleIcon aria-hidden='true' className='size-full overflow-visible' />
      </div>
    );
  }

  return (
    <div className='relative flex h-17.5 w-10.75 shrink-0 items-center justify-center overflow-visible'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageKey ?? undefined}
        alt={`${productName} 상품 이미지`}
        className='size-full object-contain'
        onError={() => setHasImageError(true)}
      />
    </div>
  );
};

export default SupplementDetailProductImage;
