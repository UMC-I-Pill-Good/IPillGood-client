import {
  MOCK_RANKING_FILTER_META,
  MOCK_RANKING_RESPONSE,
} from '../mocks/rankingMock';
import type {
  ProductSearchItemDto,
  RankingApiResponse,
  RankingQueryParams,
} from '../types/ranking';

const normalizeSearchTerm = (value: string) => value.trim().toLowerCase();

const matchesSearchTerm = (
  item: ProductSearchItemDto,
  searchTerm: string,
) => {
  if (!searchTerm) return true;

  const searchableText = [
    item.brand,
    item.productName,
    ...item.ingredientName,
    ...item.ingredientTags,
  ]
    .join(' ')
    .toLowerCase();

  return searchableText.includes(searchTerm);
};

const sortRankingItems = (
  items: ProductSearchItemDto[],
  sort: RankingQueryParams['sort'],
) => {
  return [...items].sort((a, b) => {
    if (sort === 'RATING') {
      const aRating = a.ratingAverage ?? -1;
      const bRating = b.ratingAverage ?? -1;

      if (bRating !== aRating) return bRating - aRating;
      return b.productId - a.productId;
    }

    if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
    return b.productId - a.productId;
  });
};

const matchesFilterParams = (
  item: ProductSearchItemDto,
  params: RankingQueryParams,
) => {
  const meta = MOCK_RANKING_FILTER_META[item.productId];
  if (!meta) return true;

  if (
    params.ageGroups?.length &&
    !params.ageGroups.some((ageGroup) => meta.ageGroups.includes(ageGroup))
  ) {
    return false;
  }

  if (params.gender && !meta.genders.includes(params.gender)) {
    return false;
  }

  if (
    params.healthConcernMajorCategories?.length &&
    !params.healthConcernMajorCategories.some((category) =>
      meta.healthConcernMajorCategories.includes(category),
    )
  ) {
    return false;
  }

  if (params.mfdsCertified && !item.mfdsCertified) {
    return false;
  }

  if (
    params.ingredientIds?.length &&
    !params.ingredientIds.some((ingredientId) =>
      meta.ingredientIds.includes(ingredientId),
    )
  ) {
    return false;
  }

  return true;
};

export const getMockRanking = async (
  params: RankingQueryParams,
): Promise<RankingApiResponse> => {
  const size = params.size ?? 20;
  const keyword = params.keyword?.trim() || '';
  const searchTerm = normalizeSearchTerm(keyword);
  const items = MOCK_RANKING_RESPONSE.result?.products ?? [];

  const filteredItems = items.filter(
    (item) =>
      matchesSearchTerm(item, searchTerm) &&
      matchesFilterParams(item, params),
  );
  const sortedItems = sortRankingItems(
    filteredItems,
    params.sort ?? 'REVIEW_COUNT',
  );
  const cursorIndex = params.cursor
    ? sortedItems.findIndex((item) => String(item.productId) === params.cursor)
    : -1;
  const start = cursorIndex >= 0 ? cursorIndex + 1 : 0;
  const end = start + size;
  const pagedItems = sortedItems.slice(start, end);
  const nextCursor =
    end < sortedItems.length
      ? String(pagedItems[pagedItems.length - 1]?.productId)
      : null;

  return {
    ...MOCK_RANKING_RESPONSE,
    result: {
      keyword: keyword || null,
      products: pagedItems,
      size,
      totalElements: sortedItems.length,
      hasNext: end < sortedItems.length,
      nextCursor,
    },
  };
};
