import { useQuery } from '@tanstack/react-query';
import { getHealthConcernRecommendations } from '../api/getHealthConcernRecommendations';
import { type HealthConcernRecommendationsResponse } from '../types/healthStatus';
import { useConditionErrorToast } from './useConditionErrorToast';

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

  const query = useQuery<HealthConcernRecommendationsResponse['result'] | null, Error>({
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

  useConditionErrorToast(
    query.error,
    query.isError,
    '건강 상태 추천 정보를 불러오지 못했습니다.',
  );

  return query;
};
