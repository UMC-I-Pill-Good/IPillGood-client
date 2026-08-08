import type { FaqApiCategoryType, FaqCategoryType } from '../types/Faq';

export type { FaqCategoryType } from '../types/Faq';

export const FAQ_CATEGORY_LIST = ['전체', '추천/성분', '복용/섭취', '알림', '기타'] as const;

export const FAQ_FORM_CATEGORY_LIST = ['추천/성분', '알림', '기타', '복용/섭취'] as const;

export const FAQ_CATEGORY_API_MAP: Record<
  Exclude<FaqCategoryType, '전체'>,
  FaqApiCategoryType
> = {
  '추천/성분': 'RECOMMENDATION_INGREDIENT',
  '복용/섭취': 'INTAKE',
  '알림': 'NOTIFICATION',
  '기타': 'ETC',
};

export const FAQ_CATEGORY_LABEL_MAP: Record<
  FaqApiCategoryType,
  Exclude<FaqCategoryType, '전체'>
> = {
  RECOMMENDATION_INGREDIENT: '추천/성분',
  INTAKE: '복용/섭취',
  NOTIFICATION: '알림',
  ETC: '기타',
};
