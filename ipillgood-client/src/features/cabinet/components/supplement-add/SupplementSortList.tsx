'use client';

import { useSupplementSelection } from '@/features/cabinet/hooks';
import SupplementCard from './SupplementCard';
import { SearchProductItem } from '@/features/cabinet/types/cabinet';
import { memo } from 'react';

interface SupplementSortListProps {
  products: SearchProductItem[];
}

const SupplementSortList = ({ products }: SupplementSortListProps) => {
  const { selectedIds, toggle } = useSupplementSelection();

  return (
    <section className='px-5 py-2 space-y-2 pb-4'>
      {products.map((item) => (
        <SupplementCard
          key={item.productId}
          item={item}
          checked={selectedIds.includes(item.productId)}
          onCheck={() => toggle(item.productId)}
        />
      ))}
    </section>
  );
};

export default memo(SupplementSortList);
