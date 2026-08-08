export const FAQ_CATEGORY_LIST = ['전체', '추천/성분', '복용/섭취', '알림', '기타'] as const;

export const FAQ_FORM_CATEGORY_LIST = ['추천/성분', '알림', '기타', '복용/섭취'] as const;

export type FaqCategoryType = (typeof FAQ_CATEGORY_LIST)[number];
