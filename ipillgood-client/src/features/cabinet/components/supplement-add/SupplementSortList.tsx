'use client';

import SupplementCard from './SupplementCard';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';
import { memo } from 'react';

interface SupplementSortListProps {
  products: SearchProductItem[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}

const SupplementSortList = ({ products, selectedIds, onToggle }: SupplementSortListProps) => {
  return (
    <section className='px-5 space-y-2 pb-4'>
      {products.map((item) => (
        <SupplementCard
          key={item.productId}
          item={item}
          checked={selectedIds.includes(item.productId)}
          onCheck={() => onToggle(item.productId)}
        />
      ))}
    </section>
  );
};

export default memo(SupplementSortList);
