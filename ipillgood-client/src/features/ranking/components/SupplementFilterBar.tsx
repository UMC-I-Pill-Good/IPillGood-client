'use client';

import { useState } from 'react';
import DropdownIcon from '@/assets/icons/dropdown.svg';
import DropdownOptionMenu from './DropdownOptionMenu';

const FILTERS = ['연령대', '성별', '식약처 인증', '성분', '건강 고민'] as const;
const HEALTH_CONCERN_OPTIONS = [
  '신경계',
  '감각계',
  '소화 대사계',
  '내분비계',
  '심혈관계',
  '신체방어 및 면역계',
  '근육계',
  '생식 및 비뇨계',
] as const;

const SupplementFilterBar = () => {
  const [isHealthConcernOpen, setIsHealthConcernOpen] = useState(false);
  const [selectedHealthConcern, setSelectedHealthConcern] = useState<
    (typeof HEALTH_CONCERN_OPTIONS)[number] | null
  >(null);

  const handleSelectHealthConcern = (option: (typeof HEALTH_CONCERN_OPTIONS)[number]) => {
    setSelectedHealthConcern(option);
    setIsHealthConcernOpen(false);
  };

  return (
    <div className='flex flex-wrap items-center gap-x-2 gap-y-2'>
      {FILTERS.map((filter) => {
        const isHealthConcernFilter = filter === '건강 고민';

        return (
          <div key={filter} className='relative'>
            <button
              type='button'
              className='glass text-left'
              aria-haspopup={isHealthConcernFilter ? 'listbox' : undefined}
              aria-expanded={isHealthConcernFilter ? isHealthConcernOpen : undefined}
              onClick={
                isHealthConcernFilter
                  ? () => setIsHealthConcernOpen((prev) => !prev)
                  : undefined
              }
            >
              <span className='typo-caption-2'>{filter}</span>
              <span className='inline-flex items-center gap-1'>
                <span className='typo-caption-3 text-neutral-800'>
                  {isHealthConcernFilter && selectedHealthConcern
                    ? selectedHealthConcern
                    : '전체'}
                </span>
                <DropdownIcon className='size-4' aria-hidden='true' />
              </span>
            </button>
            {isHealthConcernFilter && isHealthConcernOpen && (
              <DropdownOptionMenu
                options={HEALTH_CONCERN_OPTIONS}
                selectedOption={selectedHealthConcern}
                onSelect={handleSelectHealthConcern}
                className='left-0 right-auto w-32'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SupplementFilterBar;
