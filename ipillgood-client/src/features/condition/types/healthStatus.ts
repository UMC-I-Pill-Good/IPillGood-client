import { type CommonResponse } from '@/shared/types/api';
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

export type HealthConcernRecommendationsResponse = CommonResponse<HealthConcernRecommendationsResult>;

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
  isTwoLine?: boolean; 
};

// 4. GET /api/v1/health-concerns/categories (건강 상태 카테고리 목록 조회)
export type MinorCategory = {
  type: string;
  label: string;
};

export type MajorCategory = {
  type: string;
  label: string;
  minorCategories: MinorCategory[];
};

export type HealthConcernCategoriesResult = {
  majorCategories: MajorCategory[];
};

export type HealthConcernCategoriesResponse = CommonResponse<HealthConcernCategoriesResult>;

