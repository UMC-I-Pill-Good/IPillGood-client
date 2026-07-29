import { axiosInstance } from '@/app/api/api';

export const getDuplicateCheckId = async (username: string) => {
  const { data } = await axiosInstance.get('/auth/check-username', {
    params: {
      username,
    },
  });

  return data;
};
