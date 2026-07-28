import type { ComponentType, SVGProps } from 'react';

// 1. GET /api/v1/health-concerns/recommendations (건강 상태 추천 성분 조회)
export type IngredientSummary = {
  ingredientId: number;
  name: string;
  description: string;
  imageUrl: string;
  effectKeywords: string[];
  hasCabinetProduct: boolean;
};

export type HealthConcernRecommendationsResult = {
  healthConcernId: number;
  majorCategory: string;
  minorCategory: string;
  declineCause: string;
  recommendedIngredients: IngredientSummary[];
};

export type HealthConcernRecommendationsResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: HealthConcernRecommendationsResult;
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
  isTwoLine?: boolean; // 12px 2줄 줄바꿈 적용 여부 플래그
};
