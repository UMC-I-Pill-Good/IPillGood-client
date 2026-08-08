export type FaqCategoryType = '전체' | '추천/성분' | '복용/섭취' | '알림' | '기타';

export type FaqApiCategoryType =
  | 'RECOMMENDATION_INGREDIENT'
  | 'INTAKE'
  | 'NOTIFICATION'
  | 'ETC';

export type FaqItemType = {
  id: number;
  question: string;
  answer: string;
  category: Exclude<FaqCategoryType, '전체'>;
  updatedAt: string;
};

export type FaqApiItemType = {
  faqId: number;
  question: string;
  answer: string;
  category: FaqApiCategoryType;
  updatedAt: string;
};

export type FaqListParamsType = {
  keyword?: string;
  category?: FaqApiCategoryType;
  page: number;
  size: number;
};

export type FaqListResultType = {
  faqs: FaqApiItemType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

export type FaqUpsertRequestType = {
  question: string;
  answer: string;
  category: FaqApiCategoryType;
};

export type FaqFormValueType = {
  question: string;
  answer: string;
  category: Exclude<FaqCategoryType, '전체'>;
};
