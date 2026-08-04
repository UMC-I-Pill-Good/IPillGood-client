import { getMyInfo } from '@/features/my/api/member';
import { useQuery } from '@tanstack/react-query';

export const useMyInfoQuery = () =>
  useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
  });
