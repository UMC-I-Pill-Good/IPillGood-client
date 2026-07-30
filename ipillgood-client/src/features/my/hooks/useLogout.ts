import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postLogout } from '../api/auth';

export const useLogout = (onSuccess?: () => void) => {
  const router = useRouter();
  const { clearTokens } = useLocalStorage();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      onSuccess?.();
      clearTokens();
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      alert('로그아웃에 실패했습니다.');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { handleLogout, isLoggingOut: logoutMutation.isPending };
};
