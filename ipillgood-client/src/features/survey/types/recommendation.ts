import { CommonResponse } from '@/shared/types';

export type RecommendationItem = {
  recommendationItemId: number;
  rankNo: number;
  ingredientId: number;
  ingredientName: string;
  ingredientImageKey: string;
  effectKeywords: string[];
  recommendedIntake: string;
  recommendedIntakeTime: string;
  aiReason: string;
};

export type ResponseRecommendationResult = CommonResponse<{
  recommendationId: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'NO_RESULT';
  healthSummary: string;
  failureReason: string | null;
  startedAt: string;
  completedAt: string;
  items: RecommendationItem[];
}>;

export type ResponseRecommendationRetry = CommonResponse<{
  recommendationId: number;
  status: 'PENDING' | 'FAILED' | 'NO_RESULT';
  startedAt: string;
}>;
