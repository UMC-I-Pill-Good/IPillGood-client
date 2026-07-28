import { type HealthConcernRecommendationsResponse } from '../types/healthStatus';
import { healthConcernRecommendationMockData } from '../data/healthConcernRecommendation.mock';

export interface GetHealthConcernRecommendationsParams {
  majorCategory: string;
  minorCategory: string;
}

/**
 * 건강 상태 추천 성분 조회 (GET /api/v1/health-concerns/recommendations)
 * @param majorCategory 건강 상태 대분류 (예: 'SENSORY_SYSTEM')
 * @param minorCategory 건강 상태 소분류 (예: 'EYES')
 */
export const getHealthConcernRecommendations = async ({
  majorCategory,
  minorCategory,
}: GetHealthConcernRecommendationsParams): Promise<HealthConcernRecommendationsResponse> => {
  // 더미 데이터 반환 (API 연동 전 클라이언트 사전 테스트용)
  return {
    isSuccess: true,
    code: 'SUCCESS200_1',
    message: '건강 상태 추천 성분 조회에 성공했습니다.',
    result: {
      ...healthConcernRecommendationMockData,
      majorCategory,
      minorCategory,
    },
  };
};
