import { useQuery } from '@tanstack/react-query';
import { getHealthConcernCategories } from '../api/getHealthConcernCategories';
import { type HealthConcernCategoriesResponse } from '../types/healthStatus';

/**
 * 건강 상태 카테고리 목록 조회 TanStack Query 훅
 */
export const useHealthConcernCategories = () => {
  return useQuery<HealthConcernCategoriesResponse['result'] | null, Error>({
    queryKey: ['health-concerns', 'categories'],
    queryFn: async () => {
      const res = await getHealthConcernCategories();
      if (res.isSuccess && res.result) {
        return res.result;
      }
      throw new Error(res.message || '카테고리 조회 실패');
    },
  });
};
