import { useEffect, useState } from 'react';
import { FaqCategoryType } from '../types/faq.type';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getFaqs } from '../api/support';

export const useFaqFilter = () => {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType | 'ALL'>('ALL');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['faqs', selectedCategory, searchKeyword],
    queryFn: () =>
      getFaqs({
        category: selectedCategory === 'ALL' ? undefined : selectedCategory,
        keyword: searchKeyword || undefined,
      }),
    select: (res) => res.result.faqs,
    staleTime: 1000 * 60 * 60,
    placeholderData: keepPreviousData,
  });

  // 디바운스 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSelectCategory = (category: FaqCategoryType | 'ALL') => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    setSearchKeyword(keyword);
  };

  return {
    keyword,
    setKeyword,
    selectedCategory,
    filteredFaqList: data ?? [],
    handleSearch,
    isLoading,
    isError,
    handleSelectCategory,
  };
};
