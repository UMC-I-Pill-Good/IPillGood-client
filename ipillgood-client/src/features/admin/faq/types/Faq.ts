import type { FaqCategoryType } from '../constants/FaqCategory';

export type FaqItemType = {
  id: number;
  question: string;
  answer: string;
  category: Exclude<FaqCategoryType, '전체'>;
  updatedAt: string;
};
