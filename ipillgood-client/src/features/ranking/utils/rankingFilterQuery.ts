import type {
  HealthConcernMajorCategory,
  RankingAgeGroup,
  RankingQueryParams,
} from '../types/ranking';
import {
  AGE_OPTIONS,
  DEFAULT_RANKING_FILTERS,
  HEALTH_CONCERN_ROWS,
  type AgeFilter,
  type HealthConcernFilter,
  type RankingFilterState,
} from '../types/rankingFilter';

export interface RankingFilterRequestOptions {
  mfdsCertified?: boolean;
}

const HEALTH_CONCERN_OPTIONS = HEALTH_CONCERN_ROWS.flat();
const AGE_GROUP_BY_OPTION: Partial<Record<AgeFilter, RankingAgeGroup>> = {
  '10대': 'TEENS',
  '20대': 'TWENTIES',
  '30대': 'THIRTIES',
  '40대': 'FORTIES',
  '50대 이상': 'FIFTIES_AND_ABOVE',
};

const AGE_OPTION_BY_GROUP: Record<RankingAgeGroup, Exclude<AgeFilter, '전체'>> =
  {
    TEENS: '10대',
    TWENTIES: '20대',
    THIRTIES: '30대',
    FORTIES: '40대',
    FIFTIES_AND_ABOVE: '50대 이상',
  };

const HEALTH_CATEGORY_BY_OPTION: Record<
  Exclude<HealthConcernFilter, null>,
  HealthConcernMajorCategory
> = {
  신경계: 'NERVOUS_SYSTEM',
  감각계: 'SENSORY_SYSTEM',
  '소화 대사계': 'DIGESTIVE_METABOLISM',
  내분비계: 'ENDOCRINE_SYSTEM',
  심혈관계: 'CARDIOVASCULAR_SYSTEM',
  '신체방어 및 면역계': 'IMMUNE_SYSTEM',
  근육계: 'MUSCULAR_SYSTEM',
  '생식 및 비뇨계': 'REPRODUCTIVE_URINARY_SYSTEM',
};

const HEALTH_OPTION_BY_CATEGORY: Record<
  HealthConcernMajorCategory,
  Exclude<HealthConcernFilter, null>
> = {
  NERVOUS_SYSTEM: '신경계',
  SENSORY_SYSTEM: '감각계',
  DIGESTIVE_METABOLISM: '소화 대사계',
  ENDOCRINE_SYSTEM: '내분비계',
  CARDIOVASCULAR_SYSTEM: '심혈관계',
  IMMUNE_SYSTEM: '신체방어 및 면역계',
  MUSCULAR_SYSTEM: '근육계',
  REPRODUCTIVE_URINARY_SYSTEM: '생식 및 비뇨계',
};

const isAgeFilter = (value: string | null): value is AgeFilter =>
  AGE_OPTIONS.includes(value as AgeFilter);

const isHealthConcernFilter = (
  value: string | null,
): value is Exclude<HealthConcernFilter, null> =>
  HEALTH_CONCERN_OPTIONS.includes(
    value as Exclude<HealthConcernFilter, null>,
  );

export const toRankingQueryParams = (
  filters: RankingFilterState,
): Pick<
  RankingQueryParams,
  'ageGroups' | 'gender' | 'healthConcernMajorCategories'
> => {
  const ageGroup = AGE_GROUP_BY_OPTION[filters.ageGroup];
  const healthConcernMajorCategory = filters.healthConcern
    ? HEALTH_CATEGORY_BY_OPTION[filters.healthConcern]
    : undefined;

  return {
    ageGroups: ageGroup ? [ageGroup] : undefined,
    gender: filters.gender,
    healthConcernMajorCategories: healthConcernMajorCategory
      ? [healthConcernMajorCategory]
      : undefined,
  };
};

export const toRankingFilterRequestOptions = (
  filters: RankingFilterState,
): RankingFilterRequestOptions => ({
  mfdsCertified:
    filters.certification === 'CERTIFIED_ONLY' ? true : undefined,
});

export const getRankingFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): RankingFilterState => {
  const ageGroup = searchParams.get('ageGroups');
  const gender = searchParams.get('gender');
  const healthConcernMajorCategory = searchParams.get(
    'healthConcernMajorCategories',
  );
  const ageOption = ageGroup
    ? AGE_OPTION_BY_GROUP[ageGroup as RankingAgeGroup]
    : undefined;
  const healthConcernOption = healthConcernMajorCategory
    ? HEALTH_OPTION_BY_CATEGORY[
        healthConcernMajorCategory as HealthConcernMajorCategory
      ]
    : undefined;

  const nextAgeGroup: AgeFilter =
    ageOption && isAgeFilter(ageOption)
      ? ageOption
      : DEFAULT_RANKING_FILTERS.ageGroup;
  const nextHealthConcern: HealthConcernFilter =
    healthConcernOption && isHealthConcernFilter(healthConcernOption)
      ? healthConcernOption
      : DEFAULT_RANKING_FILTERS.healthConcern;

  return {
    ageGroup: nextAgeGroup,
    gender:
      gender === 'MALE' || gender === 'FEMALE'
        ? gender
        : DEFAULT_RANKING_FILTERS.gender,
    certification:
      searchParams.get('mfdsCertified') === 'true'
        ? 'CERTIFIED_ONLY'
        : DEFAULT_RANKING_FILTERS.certification,
    healthConcern: nextHealthConcern,
  };
};

export const appendRankingFilterSearchParams = (
  searchParams: URLSearchParams,
  filters: RankingFilterState,
) => {
  const queryParams = toRankingQueryParams(filters);
  const requestOptions = toRankingFilterRequestOptions(filters);

  if (queryParams.ageGroups?.length) {
    searchParams.set('ageGroups', queryParams.ageGroups.join(','));
  }
  if (queryParams.gender) searchParams.set('gender', queryParams.gender);
  if (queryParams.healthConcernMajorCategories?.length) {
    searchParams.set(
      'healthConcernMajorCategories',
      queryParams.healthConcernMajorCategories.join(','),
    );
  }
  if (requestOptions.mfdsCertified) {
    searchParams.set('mfdsCertified', String(requestOptions.mfdsCertified));
  }
};
