'use client';

import { SelectionCard } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { supplementItems } from '../constants/supplement.constants';
import useSelectable from '../hooks/useSelectable';

const SupplementStep = () => {
  const { selectedItems, handleSelect } = useSelectable();

  return (
    <section className='pb-8'>
      <StepHeader
        title='현재 섭취 중인 영양제가 있나요?'
        desc={'현재 섭취 중인 영양제를 선택해주세요.\n (복수 선택 가능)'}
      />

      <div className='mt-2 grid grid-cols-3 gap-2'>
        {supplementItems.map((item) => (
          <SelectionCard
            key={item.id}
            {...item}
            isSelected={selectedItems.includes(item.id)}
            onClick={handleSelect}
            className='w-full h-32 rounded-[20px]'
          />
        ))}
      </div>
    </section>
  );
};

export default SupplementStep;
