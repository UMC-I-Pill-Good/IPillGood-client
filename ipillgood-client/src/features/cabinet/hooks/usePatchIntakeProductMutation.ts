import { intakeNotificationSettingsQueryKey } from './../../my/hooks/useNotificationSettings';
import { patchActiveProduct } from '@/features/cabinet/api/intake';
import { RequestIntakeUpdate } from '@/features/cabinet/types/intake';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

interface PatchActiveProductParams {
  activeProductId: number;
  body: RequestIntakeUpdate;
}

export const usePatchIntakeProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activeProductId, body }: PatchActiveProductParams) =>
      patchActiveProduct(activeProductId, body),
    onSuccess: (response) => {
      if (!response.isSuccess) {
        alert(response.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProductDetail'] });
      queryClient.invalidateQueries({
        queryKey: intakeNotificationSettingsQueryKey,
        refetchType: 'all',
      });
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '섭취 정보를 수정하지 못했어요.');
    },
  });
};
