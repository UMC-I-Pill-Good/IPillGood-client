import { getIntakeConflict, postIntakeProduct } from '@/features/cabinet/api/intake';
import { IntakeConflict } from '@/features/cabinet/types/intake';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
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

export const useAddIntakeProducts = () => {
  const [conflicts, setConflicts] = useState<IntakeConflict[]>([]);
  const [pendingAddParams, setPendingAddParams] = useState<AddIntakeProductsParams | null>(null);
  const [isReAdditionWarningModalOpen, setIsReAdditionWarningModalOpen] = useState(false);
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
        alert(failedResponse.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
      queryClient.invalidateQueries({ queryKey: ['intakeCalendar'] });
      queryClient.invalidateQueries({ queryKey: ['growthStage'] });

      showToast.success('섭취 중인 영양제에 추가됐어요!');
      router.push('/cabinet');
    },
    onError: () => {
      showToast.error('추가에 실패했어요. 다시 시도해 주세요.');
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
        setIsReAdditionWarningModalOpen(true);
        return;
      }

      alert(errorData?.message ?? '병용 금기 여부를 확인하지 못했어요.');
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
            setIsReAdditionWarningModalOpen(true);
            onCheckComplete();
            return;
          }

          alert(failedResponse.message ?? '병용 금기 여부를 확인하지 못했어요.');
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
          alert('병용 금기 정보를 불러오지 못했어요.');
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
    }
  };

  const cancelAdd = () => {
    setConflicts([]);
    setPendingAddParams(null);
  };

  const closeReAdditionWarningModal = () => {
    setIsReAdditionWarningModalOpen(false);
  };

  return {
    conflicts,
    isWarningModalOpen: pendingAddParams !== null,
    isReAdditionWarningModalOpen,
    isPending: addIntakeProductsMutation.isPending || intakeConflictMutation.isPending,
    checkConflictsAndAdd,
    confirmAdd,
    cancelAdd,
    closeReAdditionWarningModal,
  };
};
