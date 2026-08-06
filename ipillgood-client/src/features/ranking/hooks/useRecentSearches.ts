import { useEffect, useState } from 'react';
import {
  clearRecentKeywords,
  deleteRecentKeyword,
  getRecentKeywords,
  saveRecentKeyword,
} from '../api/recentSearch';
import type { RecentKeywordDto } from '../types/recentSearch';

export const useRecentSearches = () => {
  const [recentSearchList, setRecentSearchList] = useState<RecentKeywordDto[]>([]);

  useEffect(() => {
    let isMounted = true;

    getRecentKeywords()
      .then((response) => {
        if (isMounted && response.isSuccess) {
          setRecentSearchList(response.result?.keywords ?? []);
        }
      })
      .catch((error) => {
        console.error('Failed to load recent keywords', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveRecentSearch = async (keyword: string) => {
    try {
      const response = await saveRecentKeyword(keyword);
      const savedKeyword = response.result;

      if (!response.isSuccess || !savedKeyword) {
        console.error('Failed to save recent keyword', response.message);
        return;
      }

      setRecentSearchList((currentList) =>
        [
          savedKeyword,
          ...currentList.filter((item) => item.keyword !== savedKeyword.keyword),
        ].slice(0, 10),
      );
    } catch (error) {
      console.error('Failed to save recent keyword', error);
    }
  };

  const handleRemoveRecentSearch = async (keywordId: number) => {
    try {
      const response = await deleteRecentKeyword(keywordId);
      if (!response.isSuccess) return;

      setRecentSearchList((currentList) =>
        currentList.filter((item) => item.keywordId !== keywordId),
      );
    } catch (error) {
      console.error('Failed to delete recent keyword', error);
    }
  };

  const handleClearRecentSearches = async () => {
    try {
      const response = await clearRecentKeywords();
      if (!response.isSuccess) return;

      setRecentSearchList([]);
    } catch (error) {
      console.error('Failed to clear recent keywords', error);
    }
  };

  return {
    recentSearchList,
    handleSaveRecentSearch,
    handleRemoveRecentSearch,
    handleClearRecentSearches,
  };
};
