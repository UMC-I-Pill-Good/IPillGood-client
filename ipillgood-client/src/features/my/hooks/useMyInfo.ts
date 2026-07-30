import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '../api/member';

export const myInfoQueryKey = ['myInfo'];

export const useMyInfo = () => {
  return useQuery({
    queryKey: myInfoQueryKey,
    queryFn: getMyInfo,
    select: (res) => res.result,
  });
};
