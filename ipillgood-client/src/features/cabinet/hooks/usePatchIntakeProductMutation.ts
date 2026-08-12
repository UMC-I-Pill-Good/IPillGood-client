import { intakeNotificationSettingsQueryKey } from './../../my/hooks/useNotificationSettings';
import { patchActiveProduct } from '@/features/cabinet/api/intake';
import { RequestIntakeUpdate } from '@/features/cabinet/types/intake';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@/shared/utils';

interface PatchActiveProductParams {
  activeProductId: number;
  body: RequestIntakeUpdate;
  successMessage?: string;
  errorMessage?: string;
}

export const usePatchIntakeProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activeProductId, body }: PatchActiveProductParams) =>
      patchActiveProduct(activeProductId, body),
    onSuccess: (response, variables) => {
      if (!response.isSuccess) {
        showToast.error(variables.errorMessage ?? '저장에 실패했어요. 다시 시도해 주세요.');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProductDetail'] });
      queryClient.invalidateQueries({
        queryKey: intakeNotificationSettingsQueryKey,
        refetchType: 'all',
      });

      if (variables.successMessage) {
        showToast.success(variables.successMessage);
      }
    },
    onError: (_error, variables) => {
      showToast.error(variables.errorMessage ?? '저장에 실패했어요. 다시 시도해 주세요.');
    },
  });
};
