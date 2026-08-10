import { useQuery } from '@tanstack/react-query';
import { getCabinetProducts } from '../api/cabinet';

export const useCabinetProductsQuery = () =>
  useQuery({
    queryKey: ['cabinetProducts'],
    queryFn: getCabinetProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
