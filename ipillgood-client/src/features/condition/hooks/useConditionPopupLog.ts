import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { patchConditionPopupAutoShown } from '../api/patchConditionPopupAutoShown';
import { patchConditionPopupDismissed } from '../api/patchConditionPopupDismissed';
import { conditionQueryKeys } from '../constants/conditionQueryKeys';
import { type ConditionCheckStep } from '../store/useConditionStore';
import { type ConditionCurrentWeekResult } from '../types/condition';

interface UseConditionPopupLogParams {
  currentWeekStatus: ConditionCurrentWeekResult;
  openCheckModal: (showSundayWarning: boolean, step?: ConditionCheckStep) => void;
}

export const useConditionPopupLog = ({
  currentWeekStatus,
  openCheckModal,
}: UseConditionPopupLogParams) => {
  const queryClient = useQueryClient();
  const autoPopupRecordedWeekRef = useRef<string | null>(null);

  useEffect(() => {
    const { autoPopupAvailable, checked, weekStartOn, sundayIntakeWarningRequired } =
      currentWeekStatus;

    if (
      !autoPopupAvailable ||
      checked ||
      !weekStartOn ||
      autoPopupRecordedWeekRef.current === weekStartOn
    ) {
      return;
    }

    autoPopupRecordedWeekRef.current = weekStartOn;
    openCheckModal(sundayIntakeWarningRequired, 1);

    const recordAutoPopupShown = async () => {
      try {
        const response = await patchConditionPopupAutoShown();
        if (!response.isSuccess || !response.result) {
          throw new Error(response.message || '자동 팝업 노출 기록에 실패했습니다.');
        }

        queryClient.setQueryData<ConditionCurrentWeekResult>(
          conditionQueryKeys.currentWeek(),
          (previous) =>
            previous
              ? {
                  ...previous,
                  autoPopupAvailable: false,
                  autoShownAt: response.result.autoShownAt,
                }
              : previous,
        );
      } catch (error) {
        autoPopupRecordedWeekRef.current = null;
        console.error('자동 팝업 노출 기록 실패:', error);
      }
    };

    void recordAutoPopupShown();
  }, [currentWeekStatus, openCheckModal, queryClient]);

  const dismissCurrentWeekPopup = async () => {
    if (!currentWeekStatus.isSunday || currentWeekStatus.checked) return;

    try {
      const response = await patchConditionPopupDismissed();
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '팝업 닫힘 기록에 실패했습니다.');
      }

      queryClient.setQueryData<ConditionCurrentWeekResult>(
        conditionQueryKeys.currentWeek(),
        (previous) =>
          previous ? { ...previous, dismissedAt: response.result.dismissedAt } : previous,
      );
    } catch (error) {
      console.error('팝업 닫힘 기록 실패:', error);
    }
  };

  return { dismissCurrentWeekPopup };
};
