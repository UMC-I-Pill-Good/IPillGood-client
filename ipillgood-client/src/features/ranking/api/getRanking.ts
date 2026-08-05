import { axiosInstance } from '@/app/api/api';
import type { RankingApiResponse, RankingQueryParams } from '../types/ranking';

const RANKING_API_PATH = '/search/products';

const appendSearchParam = (
  searchParams: URLSearchParams,
  key: string,
  value: string | number | boolean | string[] | number[] | undefined,
) => {
  if (value === undefined) return;

  searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value));
};

export const getRanking = async (params: RankingQueryParams): Promise<RankingApiResponse> => {
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

  const { data } = await axiosInstance.get<RankingApiResponse>(RANKING_API_PATH, {
    params: searchParams,
  });

  return data;
};
