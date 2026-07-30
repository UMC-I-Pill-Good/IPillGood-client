import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '../api/member';

export const useWithdraw = (onWithdrawSuccess: () => void) => {
  const { clearTokens } = useLocalStorage();
  const queryClient = useQueryClient();

  const withdrawMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      clearTokens();
      queryClient.clear();
      onWithdrawSuccess();
    },
    onError: () => {
      alert('회원 탈퇴에 실패했습니다.');
    },
  });

  const handleClickWithdraw = () => {
    withdrawMutation.mutate();
  };

  return { handleClickWithdraw, isWithdrawing: withdrawMutation.isPending };
};
