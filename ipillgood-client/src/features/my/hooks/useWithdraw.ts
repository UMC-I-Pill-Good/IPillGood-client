import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '../api/member';
import { deletePushTokens } from '../api/notification';
import { showToast } from '@/shared/utils';

export const useWithdraw = (onWithdrawSuccess: () => void) => {
  const { clearTokens, getPushTokenId, clearPushTokenId } = useLocalStorage();
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      const pushTokenId = getPushTokenId();
      if (pushTokenId) {
        await deletePushTokens(Number(pushTokenId)).catch(() => {});
      }

      await deleteMember();
    },
    onSuccess: () => {
      clearTokens();
      clearPushTokenId();
      queryClient.clear();
      onWithdrawSuccess();
    },
    onError: () => {
      showToast.error('탈퇴 처리에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const handleClickWithdraw = () => {
    withdrawMutation.mutate();
  };

  return { handleClickWithdraw, isWithdrawing: withdrawMutation.isPending };
};
