import { MOCK_RECENT_KEYWORDS } from '../mocks/recentSearchMock';
import type {
  ClearRecentKeywordsApiResponse,
  DeleteRecentKeywordApiResponse,
  RecentKeywordDto,
  RecentKeywordsApiResponse,
  SaveRecentKeywordApiResponse,
} from '../types/recentSearch';

const MAX_RECENT_KEYWORD_COUNT = 10;

let recentKeywords: RecentKeywordDto[] = [...MOCK_RECENT_KEYWORDS];
let nextKeywordId =
  Math.max(...MOCK_RECENT_KEYWORDS.map((item) => item.keywordId)) + 1;

const getSortedRecentKeywords = () =>
  [...recentKeywords].sort(
    (a, b) =>
      new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime(),
  );

export const getMockRecentKeywords =
  async (): Promise<RecentKeywordsApiResponse> => ({
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '최근 검색어 조회에 성공했습니다.',
    result: {
      keywords: getSortedRecentKeywords(),
    },
  });

export const saveMockRecentKeyword = async (
  keyword: string,
): Promise<SaveRecentKeywordApiResponse> => {
  const normalizedKeyword = keyword.trim();

  if (normalizedKeyword.length < 1 || normalizedKeyword.length > 100) {
    return {
      isSuccess: false,
      code: 'COMMON400_2',
      message: '요청값 검증에 실패했습니다.',
      result: null,
    };
  }

  const searchedAt = new Date().toISOString().slice(0, 19);
  const existingKeyword = recentKeywords.find(
    (item) => item.keyword === normalizedKeyword,
  );

  if (existingKeyword) {
    existingKeyword.searchedAt = searchedAt;
    recentKeywords = getSortedRecentKeywords();

    return {
      isSuccess: true,
      code: 'SUCCESS201_1',
      message: '최근 검색어 저장에 성공했습니다.',
      result: existingKeyword,
    };
  }

  const nextKeyword: RecentKeywordDto = {
    keywordId: nextKeywordId,
    keyword: normalizedKeyword,
    searchedAt,
  };
  nextKeywordId += 1;
  recentKeywords = [nextKeyword, ...getSortedRecentKeywords()].slice(
    0,
    MAX_RECENT_KEYWORD_COUNT,
  );

  return {
    isSuccess: true,
    code: 'SUCCESS201_1',
    message: '최근 검색어 저장에 성공했습니다.',
    result: nextKeyword,
  };
};

export const deleteMockRecentKeyword = async (
  keywordId: number,
): Promise<DeleteRecentKeywordApiResponse> => {
  const hasKeyword = recentKeywords.some((item) => item.keywordId === keywordId);

  if (!hasKeyword) {
    return {
      isSuccess: false,
      code: 'COMMON404_1',
      message: '요청한 리소스를 찾을 수 없습니다.',
      result: null,
    };
  }

  recentKeywords = recentKeywords.filter((item) => item.keywordId !== keywordId);

  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '최근 검색어 개별 삭제에 성공했습니다.',
    result: {
      deleted: true,
      keywordId,
    },
  };
};

export const clearMockRecentKeywords =
  async (): Promise<ClearRecentKeywordsApiResponse> => {
    const deletedCount = recentKeywords.length;
    recentKeywords = [];

    return {
      isSuccess: true,
      code: 'SUCCESS200_1',
      message: '최근 검색어 전체 삭제에 성공했습니다.',
      result: {
        deletedCount,
      },
    };
  };
