import { CommonResponse } from '@/shared/types';

export type RecommendationFeedbackCyclesDueType = {
  due: boolean;
  cycleId: number | null;
  recommendationId: number | null;
  cycleDueOn: string | null;
};

export type RecommendationFeedbackCyclesDueResponseType =
  CommonResponse<RecommendationFeedbackCyclesDueType>;

export type RecommendationFeedbackCyclesResponseRequestType = {
  responseType: 'HELPFUL' | 'UNSURE';
};
