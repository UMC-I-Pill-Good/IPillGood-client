'use client';

import { useSupplementSelection } from '@/features/cabinet/hooks';
import { supplementList } from '@/features/cabinet/mocks/supplement.mocks';
import SupplementCard from './SupplementCard';

const SupplementSortList = () => {
  const { selectedIds, toggle } = useSupplementSelection();

  return (
    <section className='px-5 py-2 space-y-2'>
      {supplementList.map((item) => (
        <SupplementCard
          key={item.id}
          item={item}
          checked={selectedIds.includes(item.id)}
          onCheck={() => toggle(item.id)}
        />
      ))}
    </section>
  );
};

export default SupplementSortList;
