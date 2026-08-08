import { axiosInstance } from '@/app/api/api';
import type {
  ClearRecentKeywordsApiResponse,
  DeleteRecentKeywordApiResponse,
  RecentKeywordsApiResponse,
  SaveRecentKeywordApiResponse,
} from '../types/recentSearch';

const RECENT_KEYWORDS_API_PATH = '/search/recent-keywords';

export const getRecentKeywords = async (): Promise<RecentKeywordsApiResponse> => {
  const { data } = await axiosInstance.get<RecentKeywordsApiResponse>(RECENT_KEYWORDS_API_PATH);

  return data;
};

export const saveRecentKeyword = async (keyword: string): Promise<SaveRecentKeywordApiResponse> => {
  const { data } = await axiosInstance.post<SaveRecentKeywordApiResponse>(
    RECENT_KEYWORDS_API_PATH,
    { keyword },
  );

  return data;
};

export const deleteRecentKeyword = async (
  keywordId: number,
): Promise<DeleteRecentKeywordApiResponse> => {
  const { data } = await axiosInstance.delete<DeleteRecentKeywordApiResponse>(
    `${RECENT_KEYWORDS_API_PATH}/${keywordId}`,
  );

  return data;
};

export const clearRecentKeywords = async (): Promise<ClearRecentKeywordsApiResponse> => {
  const { data } =
    await axiosInstance.delete<ClearRecentKeywordsApiResponse>(RECENT_KEYWORDS_API_PATH);

  return data;
};
