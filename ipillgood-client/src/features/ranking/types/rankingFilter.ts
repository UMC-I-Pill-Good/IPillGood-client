import type { RankingGender } from './ranking';

export type AgeFilter = '10대' | '20대' | '30대' | '40대' | '50대 이상';

export type CertificationFilter = 'ALL' | 'CERTIFIED_ONLY';

export type HealthConcernFilter =
  | '신경계'
  | '감각계'
  | '소화 대사계'
  | '내분비계'
  | '심혈관계'
  | '신체방어 및 면역계'
  | '근육계'
  | '생식 및 비뇨계'
  | null;

export type RankingFilterState = {
  ageGroups: AgeFilter[];
  gender?: RankingGender;
  certification: CertificationFilter;
  healthConcern: HealthConcernFilter;
  ingredientIds: number[];
};
