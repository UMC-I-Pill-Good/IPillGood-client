import { delay, http, HttpResponse } from 'msw';
import { MOCK_RANKING_API_PATH } from '../api/getRanking';
import { getMockRanking } from '../services/rankingMockService';
import type {
  HealthConcernMajorCategory,
  RankingAgeGroup,
  RankingApiSort,
  RankingGender,
} from '../types/ranking';

const isRankingApiSort = (value: string | null): value is RankingApiSort =>
  value === 'REVIEW_COUNT' || value === 'RATING';

const isRankingGender = (value: string | null): value is RankingGender =>
  value === 'MALE' || value === 'FEMALE';

const RANKING_AGE_GROUPS = [
  'TEENS',
  'TWENTIES',
  'THIRTIES',
  'FORTIES',
  'FIFTIES_AND_ABOVE',
] as const;

const HEALTH_CONCERN_MAJOR_CATEGORIES = [
  'NERVOUS_SYSTEM',
  'SENSORY_SYSTEM',
  'DIGESTIVE_METABOLISM',
  'ENDOCRINE_SYSTEM',
  'CARDIOVASCULAR_SYSTEM',
  'IMMUNE_SYSTEM',
  'MUSCULAR_SYSTEM',
  'REPRODUCTIVE_URINARY_SYSTEM',
] as const;

const splitCsv = (value: string | null) =>
  value
    ?.split(',')
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

const getRankingAgeGroups = (value: string | null): RankingAgeGroup[] =>
  splitCsv(value).filter((item): item is RankingAgeGroup =>
    RANKING_AGE_GROUPS.includes(item as RankingAgeGroup),
  );

const getHealthConcernMajorCategories = (
  value: string | null,
): HealthConcernMajorCategory[] =>
  splitCsv(value).filter((item): item is HealthConcernMajorCategory =>
    HEALTH_CONCERN_MAJOR_CATEGORIES.includes(
      item as HealthConcernMajorCategory,
    ),
  );

const getIngredientIds = (value: string | null): number[] =>
  splitCsv(value)
    .map(Number)
    .filter((item) => Number.isInteger(item));

export const rankingMockHandler = http.get(
  MOCK_RANKING_API_PATH,
  async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const size = Number(searchParams.get('size') ?? 20);
    const keyword = searchParams.get('keyword') ?? undefined;
    const sortParam = searchParams.get('sort');
    const ageGroups = getRankingAgeGroups(searchParams.get('ageGroups'));
    const genderParam = searchParams.get('gender');
    const mfdsCertified = searchParams.get('mfdsCertified');
    const healthConcernMajorCategories = getHealthConcernMajorCategories(
      searchParams.get('healthConcernMajorCategories'),
    );
    const ingredientIds = getIngredientIds(searchParams.get('ingredientIds'));
    const cursor = searchParams.get('cursor') ?? undefined;

    await delay(500);

    const response = await getMockRanking({
      size: Number.isNaN(size) ? 20 : size,
      keyword,
      sort: isRankingApiSort(sortParam) ? sortParam : undefined,
      ageGroups: ageGroups.length ? ageGroups : undefined,
      gender: isRankingGender(genderParam) ? genderParam : undefined,
      mfdsCertified: mfdsCertified === 'true' ? true : undefined,
      healthConcernMajorCategories: healthConcernMajorCategories.length
        ? healthConcernMajorCategories
        : undefined,
      ingredientIds: ingredientIds.length ? ingredientIds : undefined,
      cursor,
    });

    return HttpResponse.json(response);
  },
);
