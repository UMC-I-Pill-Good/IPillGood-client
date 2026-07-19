import type { RankingGender } from './ranking';

export const AGE_OPTIONS = [
  '전체',
  '10대',
  '20대',
  '30대',
  '40대',
  '50대 이상',
] as const;

export const GENDER_OPTIONS = ['전체', '남성', '여성'] as const;

export const CERTIFICATION_OPTIONS = ['전체', '인증 제품만'] as const;

export const HEALTH_CONCERN_ROWS = [
  ['신경계', '감각계', '소화 대사계'],
  ['내분비계', '심혈관계', '신체방어 및 면역계'],
  ['근육계', '생식 및 비뇨계'],
] as const;

export type AgeFilter = (typeof AGE_OPTIONS)[number];

// TODO: 백엔드 랭킹 조회 API에 식약처 인증 Query Parameter가 확정되면 실제 API 변환에 연결
export type CertificationFilter = 'ALL' | 'CERTIFIED_ONLY';

export type HealthConcernFilter =
  | (typeof HEALTH_CONCERN_ROWS)[number][number]
  | null;

export interface RankingFilterState {
  ageGroup: AgeFilter;
  gender?: RankingGender;
  certification: CertificationFilter;
  healthConcern: HealthConcernFilter;
}

export const DEFAULT_RANKING_FILTERS: RankingFilterState = {
  ageGroup: '전체',
  gender: undefined,
  certification: 'ALL',
  healthConcern: '신경계',
};
