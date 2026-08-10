import { useQuery } from '@tanstack/react-query';
import { getHealthConcernCategories } from '../api/getHealthConcernCategories';
import { type HealthConcernCategoriesResponse } from '../types/healthStatus';

export const useHealthConcernCategories = () => {
  const query = useQuery<HealthConcernCategoriesResponse['result'] | null, Error>({
    queryKey: ['health-concerns', 'categories'],
    queryFn: async () => {
      const res = await getHealthConcernCategories();
      if (res.isSuccess && res.result) {
        return res.result;
      }
      throw new Error(res.message || '카테고리 조회 실패');
    },
  });

  return query;
};
