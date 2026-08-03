'use client';

import { useState } from 'react';
import EmptyCabinetCard from './EmptyCabinetCard';
import CabinetCard from './CabinetCard';
import { ProductItem } from '../types/cabinet';
import { SupplementDetailBottomSheet } from '@/shared/components';
import { useCabinetProductsQuery } from '../hooks';

interface CabinetGridProps {
  mode: 'default' | 'add' | 'delete';
}

const MAX_COUNT = 9;

const CabinetGrid = ({ mode }: CabinetGridProps) => {
  const { data } = useCabinetProductsQuery();

  const products = data?.result.products || [];

  const takingIds = products
    .filter((item) => item.isActiveIntake)
    .map((item) => item.memberProductId);

  const [selectedIds, setSelectedIds] = useState<number[]>(
    mode === 'add'
      ? products.filter((item) => item.isActiveIntake).map((item) => item.memberProductId)
      : [],
  );

  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleAddSelect = (item: ProductItem) => {
    if (item.isActiveIntake) return;

    setSelectedIds((prev) => {
      if (prev.includes(item.memberProductId)) {
        return takingIds;
      }

      return [...takingIds, item.memberProductId];
    });
  };

  const handleDeleteSelect = (item: ProductItem) => {
    setSelectedIds((prev) =>
      prev.includes(item.memberProductId)
        ? prev.filter((id) => id !== item.memberProductId)
        : [...prev, item.memberProductId],
    );
  };

  const handleCardClick = (item: ProductItem) => {
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

  const slots = Array.from({ length: MAX_COUNT }, (_, index) => products[index]);

  return (
    <>
      <section className='no-center-glass mx-5 grid grid-cols-3 gap-4 rounded-[20px] bg-white/20  px-5 py-4 shadow-[4px_4px_20px_rgba(155,161,255,0.3),inset_4px_4px_4px_rgba(255,255,255,0.2)]'>
        {slots.map((item, index) =>
          item ? (
            <CabinetCard
              key={item.memberProductId}
              mode={mode}
              item={item}
              isSelected={selectedIds.includes(item.memberProductId)}
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
