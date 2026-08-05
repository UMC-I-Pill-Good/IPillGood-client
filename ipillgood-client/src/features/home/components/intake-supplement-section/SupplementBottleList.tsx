'use client';

import useEmblaCarousel from 'embla-carousel-react';
import SupplementBottleItem from './SupplementBottleItem';
import { ActiveProductType } from '../../types/intakeSupplement.type';

interface SupplementBottleListProps {
  list: ActiveProductType[];
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
      className='px-1 overflow-hidden mask-l-from-99% mask-r-from-95% flex-1'
      ref={emblaRef}
      role='region'
      aria-roledescription='carousel'
      aria-label='섭취 중인 영양제 목록'
    >
      <div className='flex gap-3'>
        {list.map((supplement: ActiveProductType) => (
          // TODO: 개별 영양제 클릭 모달
          <div key={supplement.activeProductId} className='shrink-0'>
            <SupplementBottleItem
              productName={supplement.productName}
              imageUrl={supplement.thumbnailImageUrl}
              onDeleteClick={() => onDeleteClick(supplement.activeProductId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplementBottleList;
