import type { ComponentType, SVGProps } from 'react';

// 1. GET /health-converns (건강 고민 대분류/소분류 목록 조회)
export type HealthMinorConcernType = {
  healthConcernId: number;
  minorCategory: string;
  minorCategoryName: string;
};

export type HealthMajorCategoryType = {
  majorCategory: string;
  majorCategoryName: string;
  minorConcerns: HealthMinorConcernType[];
};

export type HealthConcernListResultType = {
  majorCategories: HealthMajorCategoryType[];
};

export type HealthConcernListResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: HealthConcernListResultType;
};

// 2. POST /health-state-queries (궁금한 건강 상태 질의 제출)
export type SubmitHealthStateQueryRequestType = {
  healthConcernId: number;
};

export type HealthRecommendationType = {
  ingredientId: number;
  ingredientName: string;
  imageUrl: string | null;
  description: string;
  tags: string[];
  alreadyInCabinet: boolean;
};

export type SubmitHealthStateQueryResultType = {
  healthConcernId: number;
  majorCategoryName: string;
  minorCategoryName: string;
  declineCause: string;
  recommendations: HealthRecommendationType[];
};

export type SubmitHealthStateQueryResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: SubmitHealthStateQueryResultType;
};

// 3. UI 정적 객체 기반 렌더링용 타입
export type HealthBodyPartType = {
  key: string;
  label: string;
  healthConcernId?: number;
};

export type HealthSystemType = {
  key: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  bodyPartList: HealthBodyPartType[];
};
