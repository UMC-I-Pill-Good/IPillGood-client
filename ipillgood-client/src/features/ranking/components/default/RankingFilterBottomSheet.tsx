'use client';

import { FilterBottomSheet } from '@/shared/components';
import {
  AGE_OPTIONS,
  CERTIFICATION_OPTIONS,
  GENDER_OPTIONS,
  HEALTH_CONCERN_ROWS,
} from '../../constants/rankingFilter';
import type { CertificationFilter, RankingFilterState } from '../../types/rankingFilter';
import { genderToOption, optionToGender } from '../../utils/rankingFilterQuery';
import { FilterBottomSheetGroup } from '@/shared/components/modal/FilterBottomSheet';

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

  const updateAgeGroups = (option: (typeof AGE_OPTIONS)[number]) => {
    if (option === '전체') {
      updateDraftFilters({ ageGroups: [] });
      return;
    }

    const isSelected = draftFilters.ageGroups.includes(option);
    updateDraftFilters({
      ageGroups: isSelected
        ? draftFilters.ageGroups.filter((ageGroup) => ageGroup !== option)
        : [...draftFilters.ageGroups, option],
    });
  };

  const groups: FilterBottomSheetGroup[] = [
    {
      title: '연령대',
      options: AGE_OPTIONS.map((option) => ({
        label: option,
        isSelected:
          option === '전체'
            ? draftFilters.ageGroups.length === 0
            : draftFilters.ageGroups.includes(option),
        onClick: () => updateAgeGroups(option),
      })),
    },
    {
      title: '성별',
      options: GENDER_OPTIONS.map((option) => ({
        label: option,
        isSelected: genderToOption(draftFilters.gender) === option,
        onClick: () => updateDraftFilters({ gender: optionToGender(option) }),
      })),
    },
    {
      title: '식약처 인증',
      options: CERTIFICATION_OPTIONS.map((option) => ({
        label: option,
        isSelected: certificationToOption(draftFilters.certification) === option,
        onClick: () =>
          updateDraftFilters({
            certification: optionToCertification(option),
          }),
      })),
    },
    {
      title: '건강 고민',
      optionRows: HEALTH_CONCERN_ROWS.map((row) =>
        row.map((option) => ({
          label: option,
          isSelected: draftFilters.healthConcern === option,
          onClick: () =>
            updateDraftFilters({
              healthConcern: draftFilters.healthConcern === option ? null : option,
            }),
        })),
      ),
    },
  ];

  return (
    <FilterBottomSheet
      open={open}
      onClose={onClose}
      groups={groups}
      onReset={onReset}
      onApply={onApply}
    />
  );
};

export default RankingFilterBottomSheet;
