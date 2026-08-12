'use client';

import SupplementCard from './SupplementCard';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';
import { memo } from 'react';

interface SupplementsListProps {
  products: SearchProductItem[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onViewDetails: () => void;
}

const SupplementsList = ({ products, selectedIds, onToggle, onViewDetails }: SupplementsListProps) => {
  return (
    <section className='px-5 space-y-2 pb-4'>
      {products.map((item) => (
        <SupplementCard
          key={item.productId}
          item={item}
          checked={selectedIds.includes(item.productId)}
          onCheck={() => onToggle(item.productId)}
          onViewDetails={onViewDetails}
        />
      ))}
    </section>
  );
};

export default memo(SupplementsList);
