import type { RankingApiResponse, RankingQueryParams } from '../types/ranking';

export const MOCK_RANKING_API_PATH = '/api/mock/ranking';

const appendSearchParam = (
  searchParams: URLSearchParams,
  key: string,
  value: string | number | boolean | string[] | number[] | undefined,
) => {
  if (value === undefined) return;

  searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value));
};

export const getRanking = async (
  params: RankingQueryParams,
): Promise<RankingApiResponse> => {
  const searchParams = new URLSearchParams();

  appendSearchParam(searchParams, 'size', params.size ?? 20);
  appendSearchParam(searchParams, 'cursor', params.cursor);
  appendSearchParam(searchParams, 'keyword', params.keyword?.trim() || undefined);
  appendSearchParam(searchParams, 'sort', params.sort ?? 'REVIEW_COUNT');
  appendSearchParam(searchParams, 'ageGroups', params.ageGroups);
  appendSearchParam(searchParams, 'gender', params.gender);
  appendSearchParam(searchParams, 'mfdsCertified', params.mfdsCertified);
  appendSearchParam(
    searchParams,
    'healthConcernMajorCategories',
    params.healthConcernMajorCategories,
  );
  appendSearchParam(searchParams, 'ingredientIds', params.ingredientIds);

  const response = await fetch(
    `${MOCK_RANKING_API_PATH}?${searchParams.toString()}`,
  );

  if (!response.ok) {
    return {
      isSuccess: false,
      code: 'COMMON500_1',
      message: '영양제 상품 목록을 불러올 수 없습니다.',
      result: null,
    };
  }

  return response.json() as Promise<RankingApiResponse>;
};
