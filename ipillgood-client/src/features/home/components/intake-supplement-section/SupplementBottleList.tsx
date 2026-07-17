'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { IntakeSupplementType } from '../../types/intakeSupplement.type';
import SupplementBottleItem from './SupplementBottleItem';

interface SupplementBottleListProps {
  list: IntakeSupplementType[];
  onDeleteClick: (userSupplementId: number) => void;
}

const SupplementBottleList = ({ list, onDeleteClick }: SupplementBottleListProps) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  return (
    <div
      className='px-1 overflow-hidden mask-l-from-99% mask-r-from-99%'
      ref={emblaRef}
      role='region'
      aria-roledescription='carousel'
      aria-label='섭취 중인 영양제 목록'
    >
      <div className='flex gap-4'>
        {list.map((supplement) => (
          // TODO: 개별 영양제 클릭 모달
          <div key={supplement.userSupplementId} className='shrink-0'>
            <SupplementBottleItem
              productName={supplement.productName}
              imageUrl={supplement.imageUrl}
              onDeleteClick={() => onDeleteClick(supplement.userSupplementId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementBottleList;
