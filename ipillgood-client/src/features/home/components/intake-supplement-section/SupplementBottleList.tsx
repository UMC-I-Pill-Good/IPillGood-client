'use client';

import useEmblaCarousel from 'embla-carousel-react';
import SupplementBottleItem from './SupplementBottleItem';
import { ActiveProductType } from '../../types/intakeSupplement.type';
import { useState } from 'react';
import { ConfirmModal, SupplementDetailBottomSheet } from '@/shared/components';
import { useIntakeSupplement } from '../../hooks/useIntakeSupplement';

const SupplementBottleList = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { list, deleteTargetId, setDeleteTargetId, handleDeleteConfirm } = useIntakeSupplement();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  // 키보드 접근성
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
    if (e.key === 'ArrowRight') emblaApi?.scrollNext();
  };

  return (
    <>
      <div
        className='overflow-x-hidden pt-[11.5px] px-1 mask-l-from-99% mask-r-from-99%'
        ref={emblaRef}
        role='region'
        aria-roledescription='carousel'
        aria-label='섭취 중인 영양제 목록'
        onKeyDown={handleKeyDown}
      >
        <div className='flex gap-3'>
          {list.map((supplement: ActiveProductType) => (
            <button
              key={supplement.activeProductId}
              className='shrink-0'
              onClick={() => {
                setSelectedProductId(supplement.memberProductId);
                setIsDetailModalOpen(true);
              }}
            >
              <SupplementBottleItem
                productName={supplement.productName}
                imageUrl={supplement.thumbnailImageUrl}
                onDeleteClick={() => {
                  setDeleteTargetId(supplement.activeProductId);
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 개별 영양제 클릭 모달 */}
      <SupplementDetailBottomSheet
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        memberProductId={selectedProductId}
      />

      {/* 개별 영양제 삭제 모달 */}
      {deleteTargetId && (
        <ConfirmModal
          title={
            <>
              해당 영양제를 섭취 중인
              <br />
              영양제에서 <span className='text-semantic-600'>삭제</span>
              하시겠습니까?
            </>
          }
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </>
  );
};

export default SupplementBottleList;
