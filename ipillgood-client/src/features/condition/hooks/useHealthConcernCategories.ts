import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { showToast } from '@/shared/utils';
import { getHealthConcernCategories } from '../api/getHealthConcernCategories';
import { type HealthConcernCategoriesResponse } from '../types/healthStatus';
import { getConditionErrorMessage } from '../utils/conditionError';

/**
 * 건강 상태 카테고리 목록 조회 TanStack Query 훅
 */
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

  useEffect(() => {
    if (!query.isError) return;

    showToast.error(
      getConditionErrorMessage(query.error, '건강 상태 분류를 불러오지 못했습니다.'),
    );
  }, [query.error, query.isError]);

  return query;
};
