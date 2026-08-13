import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  clearRecentKeywords,
  deleteRecentKeyword,
  getRecentKeywords,
  saveRecentKeyword,
} from '../api/recentSearch';
import { showToast } from '@/shared/utils';

const RECENT_KEYWORDS_QUERY_KEY = ['recentKeywords'] as const;
const MAX_RECENT_KEYWORD_COUNT = 5;

export const useSaveRecentSearch = () => {
  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async (keyword: string) => {
      const response = await saveRecentKeyword(keyword);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECENT_KEYWORDS_QUERY_KEY }),
    onError: () => {
      showToast.error('최근 검색어를 저장하지 못했어요. 다시 시도해 주세요.');
    },
  });

  return (keyword: string) => saveMutation.mutate(keyword);
};

export const useRecentSearches = () => {
  const queryClient = useQueryClient();
  const handleSaveRecentSearch = useSaveRecentSearch();
  const recentKeywordsQuery = useQuery({
    queryKey: RECENT_KEYWORDS_QUERY_KEY,
    queryFn: async () => {
      const response = await getRecentKeywords();
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result.keywords.slice(0, MAX_RECENT_KEYWORD_COUNT);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (keywordId: number) => {
      const response = await deleteRecentKeyword(keywordId);
      if (!response.isSuccess) throw new Error(response.message);
      return response.result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECENT_KEYWORDS_QUERY_KEY }),
    onError: () => {
      showToast.error('최근 검색어를 삭제하지 못했어요. 다시 시도해 주세요.');
    },
  });
  const clearMutation = useMutation({
    mutationFn: async () => {
      const response = await clearRecentKeywords();
      if (!response.isSuccess) throw new Error(response.message);
      return response.result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECENT_KEYWORDS_QUERY_KEY }),
    onError: () => {
      showToast.error('최근 검색어를 모두 삭제하지 못했어요. 다시 시도해 주세요.');
    },
  });

  return {
    recentSearchList: recentKeywordsQuery.data ?? [],
    handleSaveRecentSearch,
    handleRemoveRecentSearch: (keywordId: number) => deleteMutation.mutate(keywordId),
    handleClearRecentSearches: () => clearMutation.mutate(),
  };
};
