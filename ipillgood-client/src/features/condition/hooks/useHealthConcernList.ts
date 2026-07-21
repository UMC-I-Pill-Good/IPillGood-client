import { useQuery } from '@tanstack/react-query';
import { getHealthConcernList } from '../api/getHealthConcernList';

export const useHealthConcernList = (majorCategory?: string) => {
  return useQuery({
    queryKey: ['healthConcernList', majorCategory],
    queryFn: () => getHealthConcernList(majorCategory),
    staleTime: 1000 * 60 * 5, // 5분
  });
};
