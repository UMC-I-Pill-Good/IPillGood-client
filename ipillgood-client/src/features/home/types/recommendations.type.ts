import { CommonResponse } from '@/shared/types';

export type RecommendationStatusType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'NO_RESULT';

export type RecommendationItemType = {
  recommendationItemId: number;
  rankNo: number;
  ingredientId: number;
  ingredientName: string;
  imageUrl: string;
  effectKeywords: string[];
  recommendedIntake: string | null;
  recommendedIntakeTime: string | null;
  aiReason: string;
};

export type RecommendationsCurrentType = {
  recommendationId: number | null;
  status: RecommendationStatusType;
  healthSummary: string | null;
  failureReason: string | null;
  startedAt: string | null;
  completedAt: string | null;
  items: RecommendationItemType[];
};

export type RecommendationsCurrentResponseType = CommonResponse<RecommendationsCurrentType>;
