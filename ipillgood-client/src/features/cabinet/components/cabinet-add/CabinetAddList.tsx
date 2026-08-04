'use client';

import CabinetAddCard from './CabinetAddCard';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';
import { memo } from 'react';

interface CabinetAddListProps {
  products: SearchProductItem[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

const CabinetAddList = ({ products, selectedIds, onToggle }: CabinetAddListProps) => {
  return (
    <section className='px-5 space-y-2 pb-4'>
      {products.map((item) => (
        <CabinetAddCard
          key={item.productId}
          item={item}
          checked={selectedIds.includes(item.productId)}
          onCheck={() => onToggle(item.productId)}
        />
      ))}
    </section>
  );
};

export default memo(CabinetAddList);
