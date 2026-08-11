'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Chip } from '@/shared/components';
import { useEmblaKeyboardNav } from '@/shared/hooks';

interface IngredientNameCarouselProps {
  ingredientNameList: string[];
}

const IngredientNameCarousel = ({ ingredientNameList }: IngredientNameCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const handleKeyDown = useEmblaKeyboardNav(emblaApi);

  return (
    <div
      ref={emblaRef}
      className='w-full cursor-grab overflow-hidden active:cursor-grabbing'
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
