import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postLogout } from '../api/auth';
import { deletePushTokens } from '../api/notification';

export const useLogout = (onSuccess?: () => void) => {
  const router = useRouter();
  const { clearTokens, getPushTokenId, clearPushTokenId } = useLocalStorage();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // 로그아웃 전에 이 기기의 푸시 토큰을 서버에서 먼저 삭제
      // (postLogout 이후엔 인증이 풀려서 삭제 요청이 실패할 수 있음)
      const pushTokenId = getPushTokenId();
      if (pushTokenId) {
        await deletePushTokens(Number(pushTokenId)).catch(() => {});
      }

      await postLogout();
    },
    onSuccess: () => {
      onSuccess?.();
      clearTokens();
      clearPushTokenId();
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
