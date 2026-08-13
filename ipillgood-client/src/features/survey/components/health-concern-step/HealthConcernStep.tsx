'use client';

import { SelectionCard, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import {
  HealthConcernCode,
  healthConcernItems,
} from '@/features/survey/constants/healthConcern.constants';
import { useSelectable } from '@/features/survey/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { healthConcernAtom } from '@/features/survey/atoms/survey.atom';

const HealthConcernStep = () => {
  const router = useRouter();
  const returnToParam = useSearchParams().get('returnTo') === '/my' ? '&returnTo=/my' : '';

  const [selectedItems, setSelectedItems] = useAtom(healthConcernAtom);

  const { handleSelect } = useSelectable<HealthConcernCode>({
    max: 3,
    selectedItems,
    setSelectedItems,
  });

  const isValid = selectedItems.length > 0;

  return (
    <section className='flex flex-1 flex-col'>
      <StepHeader
        title='평소 건강 고민이 무엇인가요?'
        desc='관심 분야를 선택해주세요. (최대 3개 선택)'
      />

      <div className='mt-2 grid grid-cols-4 gap-2 mb-8'>
        {healthConcernItems.map(({ id, label, icon }) => (
          <SelectionCard
            key={id}
            id={id}
            label={label}
            icon={icon}
            isSelected={selectedItems.includes(id)}
            onClick={(value) => handleSelect(value as HealthConcernCode)}
            className='w-full'
          />
        ))}
      </div>

      <TextButton
        type='button'
        text='다음'
        size='xl'
        className='mt-auto w-full'
        disabled={!isValid}
        onClick={() => router.push(`/survey?step=5${returnToParam}`)}
      />
    </section>
  );
};

export default HealthConcernStep;
