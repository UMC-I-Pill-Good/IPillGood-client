import { MOCK_RANKING_RESPONSE } from '../mocks/rankingMock';
import type {
  RankingApiResponse,
  RankingItemDto,
  RankingQueryParams,
  RankingUiSort,
} from '../types/ranking';

const normalizeSearchTerm = (value: string) => value.trim().toLowerCase();

const matchesSearchTerm = (item: RankingItemDto, searchTerm: string) => {
  if (!searchTerm) return true;

  const searchableText = [
    item.brand ?? '',
    item.productName,
    ...(item.ingredientTags ?? []),
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(searchTerm);
};

const sortRankingItems = (
  items: RankingItemDto[],
  uiSort: RankingUiSort,
) => {
  // TODO: 실제 API 연결 전 Figma UI 정렬 옵션과 백엔드 sort enum 협의 필요
  return [...items].sort((a, b) => {
    if (uiSort === 'RATING') {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
      return a.rank - b.rank;
    }

    if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
    return a.rank - b.rank;
  });
};

export const getMockRanking = async (
  params: RankingQueryParams,
  options: {
    search?: string;
    uiSort?: RankingUiSort;
  } = {},
): Promise<RankingApiResponse> => {
  const page = params.page ?? 0;
  const size = params.size ?? 20;
  const searchTerm = normalizeSearchTerm(options.search ?? '');
  const items = MOCK_RANKING_RESPONSE.result?.items ?? [];

  const filteredItems = items.filter((item) =>
    matchesSearchTerm(item, searchTerm),
  );
  const sortedItems = sortRankingItems(
    filteredItems,
    options.uiSort ?? 'REVIEW_COUNT',
  );
  const start = page * size;
  const end = start + size;
  const pagedItems = sortedItems.slice(start, end);

  return {
    ...MOCK_RANKING_RESPONSE,
    result: {
      hasNext: end < sortedItems.length,
      items: pagedItems,
    },
  };
};
