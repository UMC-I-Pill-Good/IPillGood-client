'use client';

import type { KeyboardEvent } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';

// embla carousel 좌우 화살표 키보드 탐색
export const useEmblaKeyboardNav = (emblaApi: EmblaCarouselType | undefined) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      emblaApi?.scrollPrev();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  return handleKeyDown;
};
