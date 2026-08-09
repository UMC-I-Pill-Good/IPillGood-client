import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@/shared/utils';
import { postConditionCheck } from '../api/postConditionCheck';
import { conditionQueryKeys } from '../constants/conditionQueryKeys';
import { type ConditionCheckRequest, type ConditionCurrentWeekResult } from '../types/condition';
import { getConditionYearMonth } from './useConditionQueries';

interface UseConditionCheckMutationParams {
  onCompleted: () => void;
}

export const useConditionCheckMutation = ({
  onCompleted,
}: UseConditionCheckMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: ConditionCheckRequest) => {
      const response = await postConditionCheck(request);

      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '컨디션 체크 저장에 실패했습니다.');
      }

      return response.result;
    },
    onSuccess: async (checkedRecord) => {
      const checkedYearMonth = getConditionYearMonth(checkedRecord.checkedOn);
      const monthlyRecordsQueryKey = checkedYearMonth
        ? conditionQueryKeys.monthlyRecords(checkedYearMonth.year, checkedYearMonth.month)
        : conditionQueryKeys.monthlyRecordsAll();

      queryClient.setQueryData<ConditionCurrentWeekResult>(
        conditionQueryKeys.currentWeek(),
        (previous) =>
          previous
            ? {
                ...previous,
                checked: true,
                checkAvailable: false,
                recordId: checkedRecord.recordId,
                autoPopupAvailable: false,
                sundayIntakeWarningRequired: false,
              }
            : previous,
      );
      onCompleted();
      showToast.success('이번 주 컨디션이 기록됐어요!');

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conditionQueryKeys.currentWeek() }),
        queryClient.invalidateQueries({ queryKey: monthlyRecordsQueryKey }),
      ]);
    },
    onError: () => {
      showToast.error('컨디션 기록에 실패했어요. 다시 시도해 주세요.');
    },
  });
};
