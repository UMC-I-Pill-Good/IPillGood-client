'use client';

import type { HealthSystemType } from '../../types/healthStatus';
import HealthMinorConcernButton from './HealthMinorConcernButton';

interface HealthBodyPartButtonGroupProps {
  selectedSystem?: HealthSystemType;
  selectedBodyPartKey: string | null;
  onSelectBodyPart: (bodyPartKey: string) => void;
}

const HealthBodyPartButtonGroup = ({
  selectedSystem,
  selectedBodyPartKey,
  onSelectBodyPart,
}: HealthBodyPartButtonGroupProps) => {
  return (
    <section className='flex w-full flex-col px-5 pt-4 pb-0 box-border'>
      <h2 className='typo-title-gosanja w-full text-xl font-normal not-italic leading-none text-black'>
        더 자세한 부위를 선택해 주세요.
      </h2>

      <div className='flex w-full flex-wrap items-start content-start justify-start gap-2.5 py-4'>
        {selectedSystem ? (
          selectedSystem.bodyPartList.map((part) => (
            <HealthMinorConcernButton
              key={part.key}
              id={part.key}
              label={part.label}
              isSelected={selectedBodyPartKey === part.key}
              onClick={onSelectBodyPart}
            />
          ))
        ) : (
          <p className='text-sm text-neutral-800 py-2'>
            상단에서 궁금한 신체 계통을 선택해 주세요.
          </p>
        )}
      </div>
    </section>
  );
};

export default HealthBodyPartButtonGroup;
