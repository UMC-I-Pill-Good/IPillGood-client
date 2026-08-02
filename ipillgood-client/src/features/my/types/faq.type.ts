import { CommonResponse } from '@/shared/types';

export type FaqCategoryType = 'RECOMMENDATION_INGREDIENT' | 'INTAKE' | 'NOTIFICATION' | 'ETC';

export type FaqCategoryOptionType = {
  label: string;
  value: FaqCategoryType | 'ALL';
};

export type FaqItemType = {
  faqId: number;
  category: FaqCategoryType;
  question: string;
  answer: string;
};

export type SupportType = {
  faqs: FaqItemType[];
  contactEmail: string;
  operatingHours: string;
  closedDays: string;
};

export type SupportResponseType = CommonResponse<SupportType>;

export type FaqsType = {
  faqs: FaqItemType[];
};

export type FaqsParamsType = {
  category?: FaqCategoryType;
  keyword?: string;
};

export type FaqsResponseType = CommonResponse<FaqsType>;
