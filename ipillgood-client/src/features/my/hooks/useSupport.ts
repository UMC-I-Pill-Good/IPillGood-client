import { useQuery } from '@tanstack/react-query';
import { getSupport } from '../api/support';

export const useSupport = () => {
  return useQuery({
    queryKey: ['support'],
    queryFn: () => getSupport(),
    select: (res) => res.result,
    staleTime: 1000 * 60 * 60,
  });
};
