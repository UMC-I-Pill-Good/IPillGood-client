'use client';

import { BottomSheet, TextButton } from '@/shared/components';
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
    <TextButton
      key={option}
      type='button'
      text={option}
      size='sm'
      variant={isSelected ? 'secondary' : 'assistive'}
      className={
        isSelected
          ? 'h-8 rounded-[0.625rem] px-4 py-1 text-white shadow-none backdrop-blur-none'
          : 'h-8 rounded-[0.625rem] border border-white bg-white/70 px-4 py-1 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)] saturate-150'
      }
      onClick={onClick}
    />
  );

  return (
    <BottomSheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <div className='flex h-[32.25rem] max-h-[calc(100dvh-4.5rem)] min-h-0 flex-col justify-between overflow-visible bg-background'>
        <div className='thin-scrollbar flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pb-12'>
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
