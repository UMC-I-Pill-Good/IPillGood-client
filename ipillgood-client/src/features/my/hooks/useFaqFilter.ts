import { useState } from 'react';
import { FaqCategoryType } from '../types/faq.type';
import { mockFaqList } from '../mocks/faq.mock';

export const useFaqFilter = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType | 'ALL'>('ALL');

  const filteredFaqList = mockFaqList.filter(
    (faq) =>
      (selectedCategory === 'ALL' || faq.category === selectedCategory) &&
      faq.question.includes(keyword),
  );

  const handleSelectCategory = (category: FaqCategoryType | 'ALL') => {
    setSelectedCategory(category);
  };

  return {
    keyword,
    setKeyword,
    selectedCategory,
    filteredFaqList,
    handleSelectCategory,
  };
};
