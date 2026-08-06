'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { KeyboardEvent } from 'react';
import { Chip } from '@/shared/components';

interface IngredientNameCarouselProps {
  ingredientNameList: string[];
}

const IngredientNameCarousel = ({ ingredientNameList }: IngredientNameCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

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

  return (
    <div
      ref={emblaRef}
      className='w-full overflow-x-auto [scrollbar-color:var(--color-neutral-500)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-transparent'
      role='region'
      aria-roledescription='carousel'
      aria-label='영양 성분 목록'
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className='flex gap-1'>
        {ingredientNameList.map((ingredientName) => (
          <div key={ingredientName} className='shrink-0'>
            <Chip text={ingredientName} variant='point' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientNameCarousel;
