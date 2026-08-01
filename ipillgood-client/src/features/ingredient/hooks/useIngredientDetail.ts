import { useQuery } from '@tanstack/react-query';
import { getIngredientDetail } from '../api/ingredient';

export const useIngredientDetail = (ingredientId: number) => {
  return useQuery({
    queryKey: ['ingredientDetail', ingredientId],
    queryFn: () => getIngredientDetail(ingredientId),
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });
};
