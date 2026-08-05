import type {
  HealthConcernMajorCategory,
  RankingAgeGroup,
  RankingQueryParams,
} from '../types/ranking';
import {
  AGE_OPTIONS,
  DEFAULT_RANKING_FILTERS,
  GENDER_OPTIONS,
  HEALTH_CONCERN_ROWS,
} from '../constants/rankingFilter';
import type { AgeFilter, HealthConcernFilter, RankingFilterState } from '../types/rankingFilter';
import type { RankingGender } from '../types/ranking';

type RankingFilterRequestOptions = {
  mfdsCertified?: boolean;
};

const HEALTH_CONCERN_OPTIONS = HEALTH_CONCERN_ROWS.flat();
const AGE_GROUP_BY_OPTION: Partial<Record<AgeFilter, RankingAgeGroup>> = {
  '10대': 'TEENS',
  '20대': 'TWENTIES',
  '30대': 'THIRTIES',
  '40대': 'FORTIES',
  '50대 이상': 'FIFTIES_PLUS',
};

const AGE_OPTION_BY_GROUP: Record<RankingAgeGroup, Exclude<AgeFilter, '전체'>> = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES_PLUS: '50대 이상',
};

const HEALTH_CATEGORY_BY_OPTION: Record<
  Exclude<HealthConcernFilter, null>,
  HealthConcernMajorCategory
> = {
  신경계: 'NERVOUS_SYSTEM',
  감각계: 'SENSORY_SYSTEM',
  '소화 대사계': 'DIGESTIVE_METABOLIC',
  내분비계: 'ENDOCRINE',
  심혈관계: 'CARDIOVASCULAR',
  '신체방어 및 면역계': 'IMMUNE_SYSTEM',
  근육계: 'MUSCULOSKELETAL',
  '생식 및 비뇨계': 'REPRODUCTIVE_URINARY',
};

const HEALTH_OPTION_BY_CATEGORY: Record<
  HealthConcernMajorCategory,
  Exclude<HealthConcernFilter, null>
> = {
  NERVOUS_SYSTEM: '신경계',
  SENSORY_SYSTEM: '감각계',
  DIGESTIVE_METABOLIC: '소화 대사계',
  ENDOCRINE: '내분비계',
  CARDIOVASCULAR: '심혈관계',
  IMMUNE_SYSTEM: '신체방어 및 면역계',
  MUSCULOSKELETAL: '근육계',
  REPRODUCTIVE_URINARY: '생식 및 비뇨계',
};

const isAgeFilter = (value: string | null): value is AgeFilter =>
  AGE_OPTIONS.some((option) => option === value);

const isHealthConcernFilter = (value: string | null): value is Exclude<HealthConcernFilter, null> =>
  HEALTH_CONCERN_OPTIONS.some((option) => option === value);

export const isRankingAgeGroup = (value: string): value is RankingAgeGroup =>
  Object.hasOwn(AGE_OPTION_BY_GROUP, value);

export const isHealthConcernMajorCategory = (value: string): value is HealthConcernMajorCategory =>
  Object.hasOwn(HEALTH_OPTION_BY_CATEGORY, value);

export const genderToOption = (gender?: RankingGender) => {
  if (gender === 'MALE') return '남성';
  if (gender === 'FEMALE') return '여성';
  return '전체';
};

export const optionToGender = (
  option: (typeof GENDER_OPTIONS)[number],
): RankingGender | undefined => {
  if (option === '남성') return 'MALE';
  if (option === '여성') return 'FEMALE';
  return undefined;
};

export const toRankingQueryParams = (
  filters: RankingFilterState,
): Pick<
  RankingQueryParams,
  'ageGroups' | 'gender' | 'healthConcernMajorCategories' | 'ingredientIds'
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
    ingredientIds: filters.ingredientIds.length ? filters.ingredientIds : undefined,
  };
};

export const toRankingFilterRequestOptions = (
  filters: RankingFilterState,
): RankingFilterRequestOptions => ({
  mfdsCertified: filters.certification === 'CERTIFIED_ONLY' ? true : undefined,
});

export const getRankingFiltersFromSearchParams = (
  searchParams: URLSearchParams,
): RankingFilterState => {
  const ageGroup = searchParams.get('ageGroups');
  const gender = searchParams.get('gender');
  const healthConcernMajorCategory = searchParams.get('healthConcernMajorCategories');
  const ingredientIds = (searchParams.get('ingredientIds') ?? '')
    .split(',')
    .map(Number)
    .filter((ingredientId) => Number.isInteger(ingredientId) && ingredientId > 0);
  const ageOption =
    ageGroup && isRankingAgeGroup(ageGroup) ? AGE_OPTION_BY_GROUP[ageGroup] : undefined;
  const healthConcernOption =
    healthConcernMajorCategory && isHealthConcernMajorCategory(healthConcernMajorCategory)
      ? HEALTH_OPTION_BY_CATEGORY[healthConcernMajorCategory]
      : undefined;

  const nextAgeGroup: AgeFilter =
    ageOption && isAgeFilter(ageOption) ? ageOption : DEFAULT_RANKING_FILTERS.ageGroup;
  const nextHealthConcern: HealthConcernFilter =
    healthConcernOption && isHealthConcernFilter(healthConcernOption)
      ? healthConcernOption
      : DEFAULT_RANKING_FILTERS.healthConcern;

  return {
    ageGroup: nextAgeGroup,
    gender: gender === 'MALE' || gender === 'FEMALE' ? gender : DEFAULT_RANKING_FILTERS.gender,
    certification:
      searchParams.get('mfdsCertified') === 'true'
        ? 'CERTIFIED_ONLY'
        : DEFAULT_RANKING_FILTERS.certification,
    healthConcern: nextHealthConcern,
    ingredientIds,
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
  if (queryParams.ingredientIds?.length) {
    searchParams.set('ingredientIds', queryParams.ingredientIds.join(','));
  }
};
