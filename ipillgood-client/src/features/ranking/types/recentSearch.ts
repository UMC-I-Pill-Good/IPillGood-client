import type { ApiResponse } from './ranking';

export type RecentKeywordDto = {
  keywordId: number;
  keyword: string;
  searchedAt: string;
};

export type RecentKeywordsResultDto = {
  keywords: RecentKeywordDto[];
};

export type SaveRecentKeywordRequest = {
  keyword: string;
};

export type DeleteRecentKeywordResultDto = {
  deleted: boolean;
  keywordId: number;
};

export type ClearRecentKeywordsResultDto = {
  deletedCount: number;
};

export type RecentKeywordsApiResponse = ApiResponse<RecentKeywordsResultDto>;

export type SaveRecentKeywordApiResponse = ApiResponse<RecentKeywordDto>;

export type DeleteRecentKeywordApiResponse = ApiResponse<DeleteRecentKeywordResultDto>;

export type ClearRecentKeywordsApiResponse = ApiResponse<ClearRecentKeywordsResultDto>;
