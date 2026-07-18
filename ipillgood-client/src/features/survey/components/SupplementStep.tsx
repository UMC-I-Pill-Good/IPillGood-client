'use client';

import { SelectionCard } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useState } from 'react';
import { supplementItems } from '../constants/supplement.constants';

const SupplementStep = () => {
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedSupplements((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <section className='pb-8'>
      <StepHeader
        title='현재 섭취 중인 영양제가 있나요?'
        desc={'현재 섭취 중인 영양제를 선택해주세요. (복수 선택 가능)'}
      />

      <div className='mt-2 grid grid-cols-3 gap-2'>
        {supplementItems.map(({ id, label, image }) => (
          <SelectionCard
            key={id}
            id={id}
            label={label}
            image={image}
            isSelected={selectedSupplements.includes(id)}
            onClick={handleSelect}
            className='w-full h-32 rounded-[20px]'
          />
        ))}
      </div>
    </section>
  );
};

export default SupplementStep;
