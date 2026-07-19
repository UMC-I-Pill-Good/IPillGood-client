'use client';

import { SelectionCard } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { healthConcernItems } from '../constants/healthConcern.constants';
import useSelectable from '../hooks/useSelectable';

const HealthConcernStep = () => {
  const { selectedItems, handleSelect } = useSelectable({ max: 3 });

  return (
    <section className='pb-8'>
      <StepHeader
        title='평소 건강 고민이 무엇인가요?'
        desc='관심 분야를 선택해주세요. (최대 3개 선택)'
      />

      <div className='mt-2 grid grid-cols-4 gap-2'>
        {healthConcernItems.map(({ id, label, icon }) => (
          <SelectionCard
            key={id}
            id={id}
            label={label}
            icon={icon}
            isSelected={selectedItems.includes(id)}
            onClick={handleSelect}
            className='w-full'
          />
        ))}
      </div>
    </section>
  );
};

export default HealthConcernStep;
