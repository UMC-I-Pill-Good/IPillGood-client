import { useQuery } from '@tanstack/react-query';
import { getRecommendationsCurrent } from '../api/recommendation';

export const useRecommendation = () => {
  const {
    data: recommendation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recommendationCurrent'],
    queryFn: getRecommendationsCurrent,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  return { recommendation, isLoading, isError };
};
