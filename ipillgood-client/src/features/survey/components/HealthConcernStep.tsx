'use client';

import { HealthConcernCard } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useState } from 'react';
import { healthConcernItems } from '../constants/healthConcern.constants';

const HealthConcernStep = () => {
  const [selectedHealthConcerns, setSelectedHealthConcerns] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelectedHealthConcerns((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, id];
    });
  };

  return (
    <section>
      <StepHeader
        title='평소 건강 고민이 무엇인가요?'
        desc='관심 분야를 선택해주세요. (최대 3개 선택)'
      />

      <div className='mt-2 grid grid-cols-4 gap-2'>
        {healthConcernItems.map(({ id, label, icon }) => (
          <HealthConcernCard
            key={id}
            id={id}
            label={label}
            icon={icon}
            isSelected={selectedHealthConcerns.includes(id)}
            onClick={handleSelect}
            className='w-full'
          />
        ))}
      </div>
    </section>
  );
};

export default HealthConcernStep;
