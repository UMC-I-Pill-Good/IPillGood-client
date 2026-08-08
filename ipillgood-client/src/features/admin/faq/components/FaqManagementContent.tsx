'use client';

import { useState } from 'react';
import { isAxiosError } from 'axios';

import { showToast } from '@/shared/utils/toast';

import {
  FAQ_CATEGORY_API_MAP,
  FAQ_CATEGORY_LABEL_MAP,
  type FaqCategoryType,
} from '../constants/FaqCategory';
import { useAdminFaqListQuery } from '../hooks/useAdminFaqListQuery';
import { useAdminFaqMutations } from '../hooks/useAdminFaqMutations';
import type { FaqFormValueType, FaqItemType, FaqUpsertRequestType } from '../types/Faq';
import FaqListControls from './FaqListControls';
import FaqSearchFilterSection from './FaqSearchFilterSection';

const FAQ_PAGE_SIZE = 11;

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? fallbackMessage;
  }

  return error instanceof Error ? error.message : fallbackMessage;
};

const getFaqRequestBody = (value: FaqFormValueType): FaqUpsertRequestType => {
  return {
    question: value.question,
    answer: value.answer,
    category: FAQ_CATEGORY_API_MAP[value.category],
  };
};

const FaqManagementContent = () => {
  const [searchValue, setSearchValue] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FaqCategoryType>('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const { createMutation, updateMutation, deleteMutation } = useAdminFaqMutations();
  const category =
    selectedCategory === '전체' ? undefined : FAQ_CATEGORY_API_MAP[selectedCategory];
  const faqListQuery = useAdminFaqListQuery({
    keyword: keyword || undefined,
    category,
    page: currentPage - 1,
    size: FAQ_PAGE_SIZE,
  });
  const result = faqListQuery.data?.result;
  const faqList: FaqItemType[] =
    result?.faqs.map((faq) => ({
      id: faq.faqId,
      question: faq.question,
      answer: faq.answer,
      category: FAQ_CATEGORY_LABEL_MAP[faq.category],
      updatedAt: faq.updatedAt.slice(0, 10),
    })) ?? [];
  const totalPages = result?.totalPages ?? 0;
  const isSubmitting =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleSearch = (value: string) => {
    setKeyword(value.trim());
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryValue: FaqCategoryType) => {
    setSelectedCategory(categoryValue);
    setCurrentPage(1);
  };

  const handleCreate = async (value: FaqFormValueType) => {
    try {
      const response = await createMutation.mutateAsync(getFaqRequestBody(value));
      showToast.success(response.message || 'FAQ가 추가되었습니다.');
    } catch (error) {
      showToast.error(getErrorMessage(error, 'FAQ를 추가하지 못했습니다.'));
      throw error;
    }
  };

  const handleUpdate = async (faqId: number, value: FaqFormValueType) => {
    try {
      const response = await updateMutation.mutateAsync({
        faqId,
        body: getFaqRequestBody(value),
      });
      showToast.success(response.message || 'FAQ가 수정되었습니다.');
    } catch (error) {
      showToast.error(getErrorMessage(error, 'FAQ를 수정하지 못했습니다.'));
      throw error;
    }
  };

  const handleDelete = async (faqId: number) => {
    try {
      await deleteMutation.mutateAsync(faqId);

      if (currentPage > 1 && faqList.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      showToast.error(getErrorMessage(error, 'FAQ를 삭제하지 못했습니다.'));
      throw error;
    }
  };

  return (
    <main className='flex min-h-0 flex-1 flex-col'>
      <FaqSearchFilterSection
        searchValue={searchValue}
        selectedCategory={selectedCategory}
        onSearchValueChange={setSearchValue}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      {faqListQuery.isError && (
        <p role='alert' className='px-10 pb-2 text-sm text-semantic-500'>
          FAQ 목록을 불러오지 못했습니다.
        </p>
      )}
      <div aria-busy={faqListQuery.isPending} className='flex min-h-0 flex-1 flex-col'>
        <FaqListControls
          faqList={faqList}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
};

export default FaqManagementContent;
