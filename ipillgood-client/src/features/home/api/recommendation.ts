import { axiosInstance } from '@/app/api/api';
import { RecommendationsCurrentResponseType } from '../types/recommendations.type';

// 현재 추천 결과 조회
export const getRecommendationsCurrent = async () => {
  const { data } = await axiosInstance.get<RecommendationsCurrentResponseType>(
    '/recommendations/current',
  );

  return data;
};
