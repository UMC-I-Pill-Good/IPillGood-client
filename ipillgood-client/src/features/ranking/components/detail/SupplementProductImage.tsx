'use client';

import { useState } from 'react';
import { Omega3BottleIcon } from '@/assets';
import { cn } from '@/shared/utils';

interface SupplementProductImageProps {
  imageKey: string | null;
  alt: string;
  className?: string;
}

const SupplementProductImage = ({
  imageKey,
  alt,
  className,
}: SupplementProductImageProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const shouldShowImage = Boolean(imageKey?.trim()) && !hasImageError;

  return (
    <div
      className={cn(
        'flex h-17.5 w-10.75 shrink-0 items-center justify-center overflow-visible',
        className,
      )}
    >
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageKey ?? undefined}
          alt={alt}
          className='max-h-full max-w-full object-contain'
          onError={() => setHasImageError(true)}
        />
      ) : (
        <Omega3BottleIcon aria-hidden='true' className='size-full overflow-visible' />
      )}
    </div>
  );
};

export default SupplementProductImage;
