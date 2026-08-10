import type { FaqCategoryOptionType } from '../types/faq.type';

export const FAQ_CATEGORY_OPTION_LIST: FaqCategoryOptionType[] = [
  { label: '전체', value: 'ALL' },
  { label: '추천/성분', value: 'RECOMMENDATION_INGREDIENT' },
  { label: '복용/섭취', value: 'INTAKE' },
  { label: '알림', value: 'NOTIFICATION' },
  { label: '기타', value: 'ETC' },
];
