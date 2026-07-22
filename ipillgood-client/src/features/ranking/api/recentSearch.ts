import type {
  ClearRecentKeywordsApiResponse,
  DeleteRecentKeywordApiResponse,
  RecentKeywordsApiResponse,
  SaveRecentKeywordApiResponse,
} from '../types/recentSearch';

export const MOCK_RECENT_KEYWORDS_API_PATH = '/api/mock/recent-keywords';

export const getRecentKeywords =
  async (): Promise<RecentKeywordsApiResponse> => {
    const response = await fetch(MOCK_RECENT_KEYWORDS_API_PATH);

    if (!response.ok) {
      return {
        isSuccess: false,
        code: 'COMMON500_1',
        message: '최근 검색어를 불러올 수 없습니다.',
        result: null,
      };
    }

    return response.json() as Promise<RecentKeywordsApiResponse>;
  };

export const saveRecentKeyword = async (
  keyword: string,
): Promise<SaveRecentKeywordApiResponse> => {
  const response = await fetch(MOCK_RECENT_KEYWORDS_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ keyword }),
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      code: 'COMMON500_1',
      message: '최근 검색어를 저장할 수 없습니다.',
      result: null,
    };
  }

  return response.json() as Promise<SaveRecentKeywordApiResponse>;
};

export const deleteRecentKeyword = async (
  keywordId: number,
): Promise<DeleteRecentKeywordApiResponse> => {
  const response = await fetch(`${MOCK_RECENT_KEYWORDS_API_PATH}/${keywordId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return {
      isSuccess: false,
      code: 'COMMON500_1',
      message: '최근 검색어를 삭제할 수 없습니다.',
      result: null,
    };
  }

  return response.json() as Promise<DeleteRecentKeywordApiResponse>;
};

export const clearRecentKeywords =
  async (): Promise<ClearRecentKeywordsApiResponse> => {
    const response = await fetch(MOCK_RECENT_KEYWORDS_API_PATH, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return {
        isSuccess: false,
        code: 'COMMON500_1',
        message: '최근 검색어를 전체 삭제할 수 없습니다.',
        result: null,
      };
    }

    return response.json() as Promise<ClearRecentKeywordsApiResponse>;
  };
