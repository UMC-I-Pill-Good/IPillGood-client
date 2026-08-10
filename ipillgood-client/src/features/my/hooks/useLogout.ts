import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postLogout } from '../api/auth';
import { deletePushTokens } from '../api/notification';
import { showToast } from '@/shared/utils';

export const useLogout = (onSuccess?: () => void) => {
  const router = useRouter();
  const { clearTokens, getPushTokenId, clearPushTokenId } = useLocalStorage();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // 로그아웃 전에 이 기기의 푸시 토큰을 서버에서 먼저 삭제
      // (postLogout 이후엔 인증이 풀려서 삭제 요청이 실패할 수 있음)
      const pushTokenId = getPushTokenId();
      // 삭제 실패 시 pushTokenId를 지우지 않고 남겨둬서, 다음 FCM 토큰 등록 시점에
      // (useFcmTokens의 이전 토큰 정리 로직으로) 재시도될 수 있게 함
      const pushTokenDeleted = pushTokenId
        ? await deletePushTokens(Number(pushTokenId))
            .then(() => true)
            .catch(() => false)
        : true;

      await postLogout();

      return { pushTokenDeleted };
    },
    onSuccess: ({ pushTokenDeleted }) => {
      onSuccess?.();
      clearTokens();
      if (pushTokenDeleted) clearPushTokenId();
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      showToast.error('로그아웃에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { handleLogout, isLoggingOut: logoutMutation.isPending };
};
