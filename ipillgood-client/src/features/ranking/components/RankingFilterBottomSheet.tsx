'use client';

import { useEffect } from 'react';
import { cva } from 'class-variance-authority';
import {
  AGE_OPTIONS,
  CERTIFICATION_OPTIONS,
  GENDER_OPTIONS,
  HEALTH_CONCERN_ROWS,
  type CertificationFilter,
  type RankingFilterState,
} from '../types/rankingFilter';
import type { RankingGender } from '../types/ranking';

const filterOptionVariants = cva(
  'inline-flex h-8 shrink-0 items-center justify-center rounded-[0.625rem] border-[0.5px] px-4 py-1 text-sm font-medium leading-normal transition-colors hover:border-[#AEF0D4] hover:bg-[#AEF0D4] hover:text-white active:border-[#88D4B4] active:bg-[#88D4B4] active:text-white disabled:border-[#C1C6CB] disabled:bg-[#C1C6CB] disabled:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
  {
    variants: {
      selected: {
        false: 'border-[#92E4C2] bg-transparent text-[#88D4B4]',
        true: 'border-[#AEF0D4] bg-[#AEF0D4] text-white',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

const genderToOption = (gender?: RankingGender) => {
  if (gender === 'M') return '남성';
  if (gender === 'F') return '여성';
  return '전체';
};

const optionToGender = (option: (typeof GENDER_OPTIONS)[number]) => {
  if (option === '남성') return 'M';
  if (option === '여성') return 'F';
  return undefined;
};

const certificationToOption = (certification: CertificationFilter) =>
  certification === 'CERTIFIED_ONLY' ? '인증 제품만' : '전체';

const optionToCertification = (
  option: (typeof CERTIFICATION_OPTIONS)[number],
): CertificationFilter => (option === '인증 제품만' ? 'CERTIFIED_ONLY' : 'ALL');

interface RankingFilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  draftFilters: RankingFilterState;
  onDraftFiltersChange: (filters: RankingFilterState) => void;
  onReset: () => void;
  onApply: () => void;
}

const RankingFilterBottomSheet = ({
  open,
  onClose,
  draftFilters,
  onDraftFiltersChange,
  onReset,
  onApply,
}: RankingFilterBottomSheetProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const updateDraftFilters = (filters: Partial<RankingFilterState>) => {
    onDraftFiltersChange({
      ...draftFilters,
      ...filters,
    });
  };

  const renderOption = (
    option: string,
    isSelected: boolean,
    onClick: () => void,
  ) => (
    <button
      key={option}
      type='button'
      aria-pressed={isSelected}
      className={filterOptionVariants({ selected: isSelected })}
      onClick={onClick}
    >
      {option}
    </button>
  );

  return (
    <div
      className='fixed inset-0 z-[60] flex items-end justify-center bg-black/30'
      role='presentation'
      onMouseDown={onClose}
    >
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='ranking-filter-title'
        className='ranking-filter-sheet flex h-[34.75rem] max-h-[calc(100dvh-2rem)] w-full max-w-110 flex-col justify-between rounded-t-[2.5rem] bg-background px-5 pb-4'
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className='flex h-6 shrink-0 items-center justify-center px-[7.5rem] py-2.5'>
          <span className='h-1 w-full rounded-full bg-neutral-500' />
        </div>

        <div className='flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto'>
          <h2 id='ranking-filter-title' className='typo-body-5 text-black'>
            필터
          </h2>

          <div className='flex flex-col gap-6'>
            <fieldset className='flex flex-col gap-1'>
              <legend className='text-base font-medium leading-normal text-black'>
                연령대
              </legend>
              <div className='flex flex-wrap gap-2'>
                {AGE_OPTIONS.map((option) =>
                  renderOption(option, draftFilters.ageGroup === option, () =>
                    updateDraftFilters({ ageGroup: option }),
                  ),
                )}
              </div>
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <legend className='text-base font-medium leading-normal text-black'>
                성별
              </legend>
              <div className='flex flex-wrap gap-2'>
                {GENDER_OPTIONS.map((option) =>
                  renderOption(
                    option,
                    genderToOption(draftFilters.gender) === option,
                    () =>
                      updateDraftFilters({ gender: optionToGender(option) }),
                  ),
                )}
              </div>
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <legend className='text-base font-medium leading-normal text-black'>
                식약처 인증
              </legend>
              <div className='flex flex-wrap gap-2'>
                {CERTIFICATION_OPTIONS.map((option) =>
                  renderOption(
                    option,
                    certificationToOption(draftFilters.certification) === option,
                    () =>
                      updateDraftFilters({
                        certification: optionToCertification(option),
                      }),
                  ),
                )}
              </div>
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <legend className='text-base font-medium leading-normal text-black'>
                건강 고민
              </legend>
              <div className='flex flex-col gap-2'>
                {HEALTH_CONCERN_ROWS.map((row) => (
                  <div key={row.join('-')} className='flex flex-wrap gap-2'>
                    {row.map((option) =>
                      renderOption(
                        option,
                        draftFilters.healthConcern === option,
                        () =>
                          updateDraftFilters({
                            healthConcern:
                              draftFilters.healthConcern === option
                                ? null
                                : option,
                          }),
                      ),
                    )}
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className='grid shrink-0 grid-cols-2 gap-3 pt-4'>
          <button
            type='button'
            className='h-10 rounded-[0.625rem] border border-secondary-600 bg-transparent px-2 py-1 typo-caption-2 text-secondary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600'
            onClick={onReset}
          >
            초기화
          </button>
          <button
            type='button'
            className='h-10 rounded-lg bg-primary-600 p-2.5 typo-caption-2 text-white shadow-[4px_4px_2px_rgba(0,0,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
            onClick={onApply}
          >
            적용하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default RankingFilterBottomSheet;
