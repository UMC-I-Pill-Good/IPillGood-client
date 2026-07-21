// TODO: 백엔드 카테고리 값 확정 시 실제 값으로 교체
export type FaqCategoryType = 'RECOMMEND' | 'INTAKE' | 'ALARM' | 'ETC';

export type FaqSummaryType = {
  faqId: number;
  category: FaqCategoryType;
  question: string;
  answer: string;
  displayOrder: number;
};

export type FaqListParamsType = {
  category?: FaqCategoryType;
  keyword?: string;
  page?: number;
  size?: number;
};

export type FaqListResultType = {
  faqs: FaqSummaryType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type FaqCategoryOptionType = {
  label: string;
  value: FaqCategoryType | 'ALL';
};
