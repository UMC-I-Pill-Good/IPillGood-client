'use client';

import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import { TextButton } from '@/shared/components';
import { useEmblaKeyboardNav } from '@/shared/hooks';
import { AlternativeFoodType } from '../types/ingredient';
import AlternativeFoodCard from './AlternativeFoodCard';

interface AlternativeFoodSectionProps {
  alternativeFoods: AlternativeFoodType[];
  name: string;
}

const AlternativeFoodSection = ({ alternativeFoods, name }: AlternativeFoodSectionProps) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const handleSearchClick = () => {
    router.push(`/ranking/result?search=${encodeURIComponent(name)}`);
  };

  const handleKeyDown = useEmblaKeyboardNav(emblaApi);

  return (
    <section className='flex flex-1 flex-col'>
      {alternativeFoods.length > 0 && (
        <>
          <h2 className='typo-body-1 text-black'>대체 음식 추천</h2>
          <div className='mt-2 typo-caption-6'>
            <p className=' text-neutral-800 leading-4'>
              해당 성분과 관련된 영양제를 보유하고 있지 않나요?
            </p>
            <p className='text-point-900 leading-4'>
              해당 성분을 섭취할 수 있는 음식을 추천드릴게요!
            </p>
          </div>
          <div
            className='mt-4 mb-1 overflow-hidden mask-l-from-99% mask-r-from-99%'
            ref={emblaRef}
            role='region'
            aria-roledescription='carousel'
            aria-label='대체 음식 목록'
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div className='flex gap-1 pb-3'>
              {alternativeFoods.map((food) => (
                <div key={food.name} className='w-[30%] shrink-0 px-1'>
                  <AlternativeFoodCard title={food.name} desc={food.contentPer100g} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <TextButton
        type='button'
        variant='primary'
        size='xl'
        text='관련 영양제 검색하러 가기'
        className='w-full mt-auto mb-4'
        onClick={handleSearchClick}
      />
    </section>
  );
};

export default AlternativeFoodSection;
