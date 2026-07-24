'use client';

import { useState } from 'react';
import { cabinetItems } from '../mocks/cabinet.mocks';
import EmptyCabinetCard from './EmptyCabinetCard';
import CabinetCard from './CabinetCard';
import { CabinetItem } from '../types/cabinet';
import CabinetDetailBottomSheet from './modal/CabinetDetailBottomSheet';

interface CabinetGridProps {
  mode: 'default' | 'add' | 'delete';
}

const MAX_COUNT = 9;

const CabinetGrid = ({ mode }: CabinetGridProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    mode === 'add' ? cabinetItems.filter((item) => item.isTaking).map((item) => item.id) : [],
  );

  const [selectedItem, setSelectedItem] = useState<CabinetItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const slots = Array.from({ length: MAX_COUNT }, (_, index) => cabinetItems[index]);

  return (
    <>
      <section className='no-center-glass mx-5 grid grid-cols-3 gap-4 rounded-[20px] bg-white/20 px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]'>
        {slots.map((item, index) =>
          item ? (
            <CabinetCard
              key={index}
              mode={mode}
              item={item}
              isSelected={selectedIds.includes(item.id)}
              onClick={() => {
                if (mode === 'default') {
                  setSelectedItem(item);
                  setIsBottomSheetOpen(true);
                  return;
                }

                handleSelect(item.id);
              }}
            />
          ) : (
            <EmptyCabinetCard key={`empty-${index}`} mode={mode} />
          ),
        )}
      </section>

      <CabinetDetailBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        item={selectedItem}
      />
    </>
  );
};

export default CabinetGrid;
