import { axiosInstance } from '@/app/api/api';
import {
  RecommendationFeedbackCyclesDueResponseType,
  RecommendationFeedbackCyclesResponseRequestType,
} from '../types/recommendationFeedbackCycles.type';

// 추천 피드백 대상 조회
export const getRecommendationFeedbackCyclesDue = async () => {
  const { data } = await axiosInstance.get<RecommendationFeedbackCyclesDueResponseType>(
    '/recommendation-feedback-cycles/due',
  );

  return data;
};

// 추천 피드백 응답 저장
export const postRecommendationFeedbackCyclesResponse = async (
  cycleId: number,
  body: RecommendationFeedbackCyclesResponseRequestType,
) => {
  await axiosInstance.post(`/recommendation-feedback-cycles/${cycleId}/response`, body);
};
