import { useQuery } from '@tanstack/react-query';
import { getRecommendation } from '../api/recommendation';

export const useRecommendationQuery = (recommendationId?: number) => {
  return useQuery({
    queryKey: ['recommendation', recommendationId],
    queryFn: () => getRecommendation(recommendationId!),
    enabled: !!recommendationId,
    staleTime: 1000 * 60 * 5,
    refetchInterval: (query) => {
      const status = query.state.data?.result.status;

      // 아직 생성 중이면 polling
      if (status === 'PENDING') {
        return 1000;
      }

      return false;
    },
  });
};
