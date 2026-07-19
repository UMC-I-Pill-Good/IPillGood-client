'use client';

import { BottomSheet, TextButton } from '@/shared/components';
import { cn } from '@/shared/utils/cn';
import {
  AGE_OPTIONS,
  CERTIFICATION_OPTIONS,
  GENDER_OPTIONS,
  HEALTH_CONCERN_ROWS,
  type CertificationFilter,
  type RankingFilterState,
} from '../../types/rankingFilter';
import type { RankingGender } from '../../types/ranking';

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
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-[0.625rem] px-4 py-1 typo-caption-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
        isSelected
          ? 'bg-secondary-600 text-white shadow-none backdrop-blur-none'
          : 'border border-white bg-white/70 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)] backdrop-blur-xl saturate-150 hover:bg-secondary-600/80 hover:text-white active:bg-secondary-600 active:text-white',
      )}
      onClick={onClick}
    >
      {option}
    </button>
  );

  return (
    <BottomSheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      handleWrapperClassName='mx-0 my-2.5 flex h-1 w-full shrink-0 items-center justify-center'
      handleClassName='h-1 w-[9.5625rem]'
    >
      <div className='flex h-[32.25rem] max-h-[calc(100dvh-4.5rem)] min-h-0 flex-col justify-between overflow-visible bg-white'>
        <div className='flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto'>
          <h2 className='typo-body-5 text-black'>
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

        <div className='grid shrink-0 grid-cols-2 gap-3 pt-4 pb-2'>
          <TextButton
            type='button'
            text='초기화'
            variant='outline'
            size='sm'
            className='h-10 w-full shadow-none'
            onClick={onReset}
          />
          <TextButton
            type='button'
            text='적용하기'
            variant='primary'
            size='sm'
            className='h-10 w-full shadow-[4px_4px_2px_rgba(0,0,0,0.15)]'
            onClick={onApply}
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default RankingFilterBottomSheet;
