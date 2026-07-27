'use client';

import { useState } from 'react';
import { Omega3BottleIcon } from '@/assets';
import { cn } from '@/shared/utils';

interface SupplementProductImageProps {
  imageKey: string | null;
  alt: string;
  className?: string;
}

interface ImageErrorState {
  imageUrl: string | null;
  hasError: boolean;
}

const SupplementProductImage = ({
  imageKey,
  alt,
  className,
}: SupplementProductImageProps) => {
  const normalizedImageUrl = imageKey?.trim() || null;
  const [imageErrorState, setImageErrorState] = useState<ImageErrorState>({
    imageUrl: normalizedImageUrl,
    hasError: false,
  });

  if (imageErrorState.imageUrl !== normalizedImageUrl) {
    setImageErrorState({
      imageUrl: normalizedImageUrl,
      hasError: false,
    });
  }

  const shouldShowImage = Boolean(normalizedImageUrl) && !imageErrorState.hasError;

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
          src={normalizedImageUrl ?? undefined}
          alt={alt}
          className='max-h-full max-w-full object-contain'
          onError={() =>
            setImageErrorState({
              imageUrl: normalizedImageUrl,
              hasError: true,
            })
          }
        />
      ) : (
        <Omega3BottleIcon aria-hidden='true' className='size-full overflow-visible' />
      )}
    </div>
  );
};

export default SupplementProductImage;
