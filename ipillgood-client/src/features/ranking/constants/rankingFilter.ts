import type { RankingFilterState } from '../types/rankingFilter';

export const AGE_OPTIONS = ['전체', '10대', '20대', '30대', '40대', '50대 이상'] as const;

export const GENDER_OPTIONS = ['전체', '남성', '여성'] as const;

export const CERTIFICATION_OPTIONS = ['전체', '인증 제품만'] as const;

export const HEALTH_CONCERN_ROWS = [
  ['신경계', '감각계', '소화 대사계'],
  ['내분비계', '심혈관계', '신체방어 및 면역계'],
  ['근육계', '생식 및 비뇨계'],
] as const;

export const DEFAULT_RANKING_FILTERS: RankingFilterState = {
  ageGroup: '전체',
  gender: undefined,
  certification: 'ALL',
  healthConcern: null,
  ingredientIds: [],
};
