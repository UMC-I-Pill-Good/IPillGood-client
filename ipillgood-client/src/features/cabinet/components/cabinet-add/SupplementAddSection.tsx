'use client';

import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';
import { useCabinetAddProducts } from '@/features/cabinet/hooks';
import { TextButton } from '@/shared/components';
import { memo } from 'react';

interface SupplementAddSectionProps {
  selectedIds: number[];
}

const SupplementAddSection = ({ selectedIds }: SupplementAddSectionProps) => {
  const {
    conflicts,
    isWarningModalOpen,
    isPending,
    handleAddClick,
    handleWarningCancel,
    handleWarningConfirm,
  } = useCabinetAddProducts(selectedIds);

  return (
    <>
      <section className='shrink-0 px-5 pb-28 pt-4'>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          size='xl'
          className='w-full'
          disabled={selectedIds.length === 0 || isPending}
          onClick={handleAddClick}
        />
      </section>

      {isWarningModalOpen && (
        <InteractionWarningModal
          conflicts={conflicts}
          onCancel={handleWarningCancel}
          onConfirm={handleWarningConfirm}
        />
      )}
    </>
  );
};

export default memo(SupplementAddSection);
