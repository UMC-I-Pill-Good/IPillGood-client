'use client';

import { useState } from 'react';
import { cabinetItems } from '../mocks/cabinet.mocks';
import EmptyCabinetCard from './EmptyCabinetCard';
import CabinetCard from './CabinetCard';
import { CabinetItem } from '../types/cabinet';
import { SupplementDetailBottomSheet } from '@/shared/components';
import { useCabinetProductsQuery } from '../hooks';

interface CabinetGridProps {
  mode: 'default' | 'add' | 'delete';
}

const MAX_COUNT = 9;

const CabinetGrid = ({ mode }: CabinetGridProps) => {
  const { data } = useCabinetProductsQuery();

  console.log('data', data);

  const takingIds = cabinetItems.filter((item) => item.isTaking).map((item) => item.id);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    mode === 'add' ? cabinetItems.filter((item) => item.isTaking).map((item) => item.id) : [],
  );

  const [selectedItem, setSelectedItem] = useState<CabinetItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleAddSelect = (item: CabinetItem) => {
    if (item.isTaking) return;

    setSelectedIds((prev) => {
      if (prev.includes(item.id)) {
        return takingIds;
      }

      return [...takingIds, item.id];
    });
  };

  const handleDeleteSelect = (item: CabinetItem) => {
    setSelectedIds((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
    );
  };

  const handleCardClick = (item: CabinetItem) => {
    if (mode === 'default') {
      setSelectedItem(item);
      setIsBottomSheetOpen(true);
      return;
    }

    if (mode === 'add') {
      handleAddSelect(item);
    } else {
      handleDeleteSelect(item);
    }
  };

  const slots = Array.from({ length: MAX_COUNT }, (_, index) => cabinetItems[index]);

  return (
    <>
      <section className='no-center-glass mx-5 grid grid-cols-3 gap-4 rounded-[20px] bg-white/20  px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]'>
        {slots.map((item, index) =>
          item ? (
            <CabinetCard
              key={item.id}
              mode={mode}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              onClick={() => handleCardClick(item)}
            />
          ) : (
            <EmptyCabinetCard key={`empty-${index}`} mode={mode} />
          ),
        )}
      </section>

      <SupplementDetailBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        item={selectedItem}
      />
    </>
  );
};

export default CabinetGrid;
