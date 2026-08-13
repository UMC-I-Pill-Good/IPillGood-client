import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  clearRecentKeywords,
  deleteRecentKeyword,
  getRecentKeywords,
  saveRecentKeyword,
} from '../api/recentSearch';

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
    onError: (error) => console.error('Failed to save recent keyword', error),
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
    onError: (error) => console.error('Failed to delete recent keyword', error),
  });
  const clearMutation = useMutation({
    mutationFn: async () => {
      const response = await clearRecentKeywords();
      if (!response.isSuccess) throw new Error(response.message);
      return response.result;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECENT_KEYWORDS_QUERY_KEY }),
    onError: (error) => console.error('Failed to clear recent keywords', error),
  });

  return {
    recentSearchList: recentKeywordsQuery.data ?? [],
    handleSaveRecentSearch,
    handleRemoveRecentSearch: (keywordId: number) => deleteMutation.mutate(keywordId),
    handleClearRecentSearches: () => clearMutation.mutate(),
  };
};
