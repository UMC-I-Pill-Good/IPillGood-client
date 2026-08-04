'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useConditionStore } from '../store/useConditionStore';
import { getConditionSummary } from '../api/getConditionSummary';
import { getConditionCurrentWeek } from '../api/getConditionCurrentWeek';
import { postConditionCheck } from '../api/postConditionCheck';
import { patchConditionPopupAutoShown } from '../api/patchConditionPopupAutoShown';
import { patchConditionPopupDismissed } from '../api/patchConditionPopupDismissed';
import { conditionQueryKeys } from '../constants/conditionQueryKeys';
import { validateConditionCheck } from '../utils/conditionValidation';
import {
  type ConditionCurrentWeekResult,
  type ConditionMonthlyRecordsResult,
} from '../types/condition';

const DEFAULT_CURRENT_WEEK_STATUS: ConditionCurrentWeekResult = {
  today: '',
  weekStartOn: '',
  weekEndOn: '',
  isSunday: false,
  checkAvailable: false,
  checked: false,
  recordId: null,
  autoPopupAvailable: false,
  autoShownAt: null,
  dismissedAt: null,
  sundayIntakeWarningRequired: false,
};

const getDefaultMonthlyRecords = (year: number, month: number): ConditionMonthlyRecordsResult => ({
  year,
  month,
  averageConditionScore: null,
  averageVitalityScore: null,
  averageSleepHours: null,
  averageIntakeDaysCount: null,
  records: [],
});

const getYearMonth = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  return { year, month };
};

export const useConditionFlow = () => {
  const queryClient = useQueryClient();
  const initialDate = new Date();
  const [selectedYearMonth, setSelectedYearMonth] = useState({
    year: initialDate.getFullYear(),
    month: initialDate.getMonth() + 1,
  });
  const hasSyncedServerDateRef = useRef(false);
  const autoPopupRecordedWeekRef = useRef<string | null>(null);

  const {
    isCheckModalOpen,
    isSundayModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    openCheckModal,
    forceOpenCheckModal,
    closeCheckModal,
    closeSundayModal,
    setCheckStep,
    setVitalityScore,
    setSleepTime,
  } = useConditionStore();

  const currentWeekQuery = useQuery({
    queryKey: conditionQueryKeys.currentWeek(),
    queryFn: async () => {
      const response = await getConditionCurrentWeek();
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '이번 주 컨디션 상태 조회에 실패했습니다.');
      }
      return response.result;
    },
    staleTime: 30_000,
  });

  const currentWeekStatus = currentWeekQuery.data ?? DEFAULT_CURRENT_WEEK_STATUS;

  useEffect(() => {
    if (!currentWeekQuery.data?.today || hasSyncedServerDateRef.current) return;

    setSelectedYearMonth(getYearMonth(currentWeekQuery.data.today));
    hasSyncedServerDateRef.current = true;
  }, [currentWeekQuery.data?.today]);

  const monthlyRecordsQuery = useQuery({
    queryKey: conditionQueryKeys.monthlyRecords(selectedYearMonth.year, selectedYearMonth.month),
    queryFn: async () => {
      const response = await getConditionSummary(selectedYearMonth.year, selectedYearMonth.month);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '월별 컨디션 조회에 실패했습니다.');
      }
      return response.result;
    },
    enabled: Boolean(currentWeekQuery.data?.today),
    staleTime: 5 * 60_000,
  });

  const homeSummaryData =
    monthlyRecordsQuery.data ??
    getDefaultMonthlyRecords(selectedYearMonth.year, selectedYearMonth.month);

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

    patchConditionPopupAutoShown()
      .then((response) => {
        if (!response.isSuccess || !response.result) return;

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
      })
      .catch((error) => {
        autoPopupRecordedWeekRef.current = null;
        console.error('자동 팝업 노출 기록 실패:', error);
      });
  }, [currentWeekStatus, openCheckModal, queryClient]);

  const conditionCheckMutation = useMutation({
    mutationFn: postConditionCheck,
    onSuccess: async (response) => {
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '컨디션 체크 저장에 실패했습니다.');
      }

      const checkedRecord = response.result;
      const checkedYearMonth = getYearMonth(checkedRecord.checkedOn);

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
      setCheckStep(4);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conditionQueryKeys.currentWeek() }),
        queryClient.invalidateQueries({
          queryKey: conditionQueryKeys.monthlyRecords(
            checkedYearMonth.year,
            checkedYearMonth.month,
          ),
        }),
      ]);
    },
  });

  const handleOpenStartModal = () => {
    if (!currentWeekStatus.checkAvailable || currentWeekStatus.checked) return;
    openCheckModal(currentWeekStatus.sundayIntakeWarningRequired, 1);
  };

  const handleContinueFromSunday = () => {
    forceOpenCheckModal(1);
  };

  const handleStartCheck = () => setCheckStep(2);
  const handleBackToStart = () => setCheckStep(1);

  const handleNextVitalityStep = (selectedScore: number) => {
    validateConditionCheck(selectedScore, sleepHours, sleepMinutes);
    setVitalityScore(selectedScore);
    setCheckStep(3);
  };

  const handleBackToVitality = () => setCheckStep(2);

  const handleCompleteSleepStep = async (sleepTime: { hours: number; minutes: number }) => {
    validateConditionCheck(vitalityScore, sleepTime.hours, sleepTime.minutes);
    setSleepTime(sleepTime.hours, sleepTime.minutes);

    try {
      await conditionCheckMutation.mutateAsync({
        vitalityScore,
        sleepHours: sleepTime.hours,
        sleepMinutes: sleepTime.minutes,
      });
    } catch (error) {
      console.error('컨디션 체크 저장 실패:', error);
    }
  };

  const handleDismissPopup = async () => {
    if (!currentWeekStatus.isSunday || currentWeekStatus.checked) return;

    try {
      const response = await patchConditionPopupDismissed();
      if (!response.isSuccess || !response.result) return;

      queryClient.setQueryData<ConditionCurrentWeekResult>(
        conditionQueryKeys.currentWeek(),
        (previous) =>
          previous ? { ...previous, dismissedAt: response.result.dismissedAt } : previous,
      );
    } catch (error) {
      console.error('팝업 닫힘 기록 실패:', error);
    }
  };

  const handleCloseCheckModal = () => {
    closeCheckModal();
    if (checkStep === 4) return;
    void handleDismissPopup();
  };

  const handleCloseSundayModal = () => {
    closeSundayModal();
    void handleDismissPopup();
  };

  const handlePreviousMonth = () => {
    setSelectedYearMonth(({ year, month }) =>
      month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 },
    );
  };

  const handleNextMonth = () => {
    setSelectedYearMonth(({ year, month }) =>
      month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 },
    );
  };

  return {
    homeSummaryData,
    currentWeekStatus,
    isCurrentWeekLoading: currentWeekQuery.isLoading,
    isMonthlyRecordsLoading: currentWeekQuery.isLoading || monthlyRecordsQuery.isLoading,
    isMonthlyRecordsFetching: monthlyRecordsQuery.isFetching,
    isCheckModalOpen,
    isSundayModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    isSubmitting: conditionCheckMutation.isPending,
    closeCheckModal: handleCloseCheckModal,
    closeSundayModal: handleCloseSundayModal,
    handleOpenStartModal,
    handleContinueFromSunday,
    handleStartCheck,
    handleBackToStart,
    handleNextVitalityStep,
    handleBackToVitality,
    handleCompleteSleepStep,
    handleBackToSleep: () => setCheckStep(3),
    handleViewGraph: closeCheckModal,
    handlePreviousMonth,
    handleNextMonth,
  };
};
