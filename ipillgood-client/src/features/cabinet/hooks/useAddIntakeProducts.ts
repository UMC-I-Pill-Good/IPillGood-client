import { getIntakeConflict, postIntakeProduct } from '@/features/cabinet/api/intake';
import { IntakeConflict } from '@/features/cabinet/types/intake';
import { TOAST_MESSAGES } from '@/shared/constants/toastMessages';
import { invalidateActiveProductQueries } from '@/shared/utils/invalidateMemberProductQueries';
import { showToast } from '@/shared/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AddIntakeProductsParams {
  memberProductIds: number[];
  intakeTime: string;
  frequency: string;
}

interface UseAddIntakeProductsOptions {
  onSuccess?: () => void;
}

export const useAddIntakeProducts = ({ onSuccess }: UseAddIntakeProductsOptions = {}) => {
  const [conflicts, setConflicts] = useState<IntakeConflict[]>([]);
  const [pendingAddParams, setPendingAddParams] = useState<AddIntakeProductsParams | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const addIntakeProductsMutation = useMutation({
    mutationFn: ({ memberProductIds, intakeTime, frequency }: AddIntakeProductsParams) =>
      Promise.all(
        memberProductIds.map((memberProductId) =>
          postIntakeProduct({ memberProductId, intakeTime, frequency }),
        ),
      ),
    onSuccess: (responses) => {
      const failedResponse = responses.find((response) => !response.isSuccess);

      if (failedResponse) {
        showToast.error(TOAST_MESSAGES.SUPPLEMENT_ADD_FAILED);
        return;
      }

      invalidateActiveProductQueries(queryClient);

      showToast.success(TOAST_MESSAGES.SUPPLEMENT_ADDED);
      if (onSuccess) {
        onSuccess();
        return;
      }

      router.push('/cabinet');
    },
    onError: () => {
      showToast.error(TOAST_MESSAGES.SUPPLEMENT_ADD_FAILED);
    },
  });

  const intakeConflictMutation = useMutation({
    mutationFn: (memberProductIds: number[]) =>
      Promise.all(memberProductIds.map(getIntakeConflict)),
    onError: (error) => {
      const errorData = isAxiosError<{ code?: string; message?: string }>(error)
        ? error.response?.data
        : undefined;

      if (errorData?.code === 'INTAKE409_3') {
        showToast.error('오늘은 재추가 추가할 수 없습니다.');
        return;
      }

      showToast.error(errorData?.message ?? '병용 금기 여부를 확인하지 못했어요.');
    },
  });

  const checkConflictsAndAdd = (
    addParams: AddIntakeProductsParams,
    onCheckComplete: () => void,
  ) => {
    intakeConflictMutation.mutate(addParams.memberProductIds, {
      onSuccess: (responses) => {
        const failedResponse = responses.find((response) => !response.isSuccess);

        if (failedResponse) {
          if (failedResponse.code === 'INTAKE409_3') {
            showToast.error('오늘은 재추가 추가할 수 없습니다.');
            onCheckComplete();
            return;
          }

          showToast.error(failedResponse.message ?? '병용 금기 여부를 확인하지 못했어요.');
          onCheckComplete();
          return;
        }

        const hasConflicts = responses.some((response) => response.result.hasConflicts);
        const detectedConflicts = responses
          .filter((response) => response.result.hasConflicts)
          .flatMap((response) => response.result.conflicts);

        if (!hasConflicts) {
          addIntakeProductsMutation.mutate(addParams);
          onCheckComplete();
          return;
        }

        if (detectedConflicts.length === 0) {
          showToast.error('병용 금기 정보를 불러오지 못했어요.');
          onCheckComplete();
          return;
        }

        setConflicts(detectedConflicts);
        setPendingAddParams(addParams);
        onCheckComplete();
      },
      onError: onCheckComplete,
    });
  };

  const confirmAdd = () => {
    if (pendingAddParams) {
      addIntakeProductsMutation.mutate(pendingAddParams);
      setConflicts([]);
      setPendingAddParams(null);
    }
  };

  const cancelAdd = () => {
    setConflicts([]);
    setPendingAddParams(null);
  };

  return {
    conflicts,
    isWarningModalOpen: pendingAddParams !== null,
    isPending: addIntakeProductsMutation.isPending || intakeConflictMutation.isPending,
    checkConflictsAndAdd,
    confirmAdd,
    cancelAdd,
  };
};
