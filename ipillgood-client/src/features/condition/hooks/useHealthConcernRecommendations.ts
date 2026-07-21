import { useQuery } from '@tanstack/react-query';
import { getHealthConcernRecommendations } from '../api/getHealthConcernRecommendations';
import { type HealthConcernRecommendationsResponse } from '../types/healthStatus';

interface UseHealthConcernRecommendationsParams {
  majorCategory?: string | null;
  minorCategory?: string | null;
}

/**
 * 건강 상태 추천 성분 조회 TanStack Query 훅
 */
export const useHealthConcernRecommendations = ({
  majorCategory,
  minorCategory,
}: UseHealthConcernRecommendationsParams) => {
  const isEnabled = Boolean(majorCategory && minorCategory);

  return useQuery<HealthConcernRecommendationsResponse['result'] | null, Error>({
    queryKey: ['health-concerns', 'recommendations', majorCategory, minorCategory],
    queryFn: async () => {
      if (!majorCategory || !minorCategory) return null;
      const res = await getHealthConcernRecommendations({
        majorCategory,
        minorCategory,
      });
      if (res.isSuccess && res.result) {
        return res.result;
      }
      throw new Error(res.message || '조회 실패');
    },
    enabled: isEnabled,
  });
};
