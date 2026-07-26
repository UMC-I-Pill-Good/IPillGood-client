import { useState } from 'react';
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  HEALTH_OPTIONS,
} from '../constants/supplementFilter.constants';
import { DraftFilters } from '../types/supplement';

export const useSupplementFilters = () => {
  const [draftFilters, setDraftFilters] = useState<DraftFilters>({
    ageGroup: '전체',
    gender: '전체',
    certification: 'ALL',
    healthConcern: null,
  });

  const resetFilters = () =>
    setDraftFilters({
      ageGroup: '전체',
      gender: '전체',
      certification: 'ALL',
      healthConcern: null,
    });

  const filterGroups = [
    {
      title: '연령대',
      options: AGE_OPTIONS.map((option) => ({
        label: option,
        isSelected: draftFilters.ageGroup === option,
        onClick: () => setDraftFilters((prev) => ({ ...prev, ageGroup: option })),
      })),
    },
    {
      title: '성별',
      options: GENDER_OPTIONS.map((option) => ({
        label: option,
        isSelected: draftFilters.gender === option,
        onClick: () => setDraftFilters((prev) => ({ ...prev, gender: option })),
      })),
    },
    {
      title: '식약처 인증',
      options: [
        {
          label: '인증 제품만',
          isSelected: draftFilters.certification === 'CERTIFIED',
          onClick: () =>
            setDraftFilters((prev) => ({
              ...prev,
              certification: prev.certification === 'CERTIFIED' ? 'ALL' : 'CERTIFIED',
            })),
        },
      ],
    },
    {
      title: '건강 고민',
      optionRows: [
        HEALTH_OPTIONS.slice(0, 3),
        HEALTH_OPTIONS.slice(3, 6),
        HEALTH_OPTIONS.slice(6),
      ].map((row) =>
        row.map((option) => ({
          label: option,
          isSelected: draftFilters.healthConcern === option,
          onClick: () => setDraftFilters((prev) => ({ ...prev, healthConcern: option })),
        })),
      ),
    },
  ];

  return { draftFilters, filterGroups, resetFilters };
};
