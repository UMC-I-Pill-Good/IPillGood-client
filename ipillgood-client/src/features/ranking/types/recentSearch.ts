import type { ApiResponse } from './ranking';

export interface RecentKeywordDto {
  keywordId: number;
  keyword: string;
  searchedAt: string;
}

export interface RecentKeywordsResultDto {
  keywords: RecentKeywordDto[];
}

export interface SaveRecentKeywordRequest {
  keyword: string;
}

export interface DeleteRecentKeywordResultDto {
  deleted: boolean;
  keywordId: number;
}

export interface ClearRecentKeywordsResultDto {
  deletedCount: number;
}

export type RecentKeywordsApiResponse = ApiResponse<RecentKeywordsResultDto>;

export type SaveRecentKeywordApiResponse = ApiResponse<RecentKeywordDto>;

export type DeleteRecentKeywordApiResponse =
  ApiResponse<DeleteRecentKeywordResultDto>;

export type ClearRecentKeywordsApiResponse =
  ApiResponse<ClearRecentKeywordsResultDto>;
