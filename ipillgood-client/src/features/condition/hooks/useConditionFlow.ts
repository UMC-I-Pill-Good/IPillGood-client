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
  type ConditionCheckRequest,
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
  const [year, month] = date.slice(0, 10).split('-').map(Number);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }

  return { year, month };
};

export const useConditionFlow = () => {
  const queryClient = useQueryClient();
  const initialDate = new Date();
  const [selectedYearMonth, setSelectedYearMonth] = useState<{
    year: number;
    month: number;
  } | null>(null);
  const [conditionCheckError, setConditionCheckError] = useState<string | null>(null);
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
  const activeYearMonth =
    selectedYearMonth ??
    getYearMonth(currentWeekStatus.today) ?? {
      year: initialDate.getFullYear(),
      month: initialDate.getMonth() + 1,
    };

  const monthlyRecordsQuery = useQuery({
    queryKey: conditionQueryKeys.monthlyRecords(activeYearMonth.year, activeYearMonth.month),
    queryFn: async () => {
      const response = await getConditionSummary(activeYearMonth.year, activeYearMonth.month);
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
    getDefaultMonthlyRecords(activeYearMonth.year, activeYearMonth.month);

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
    mutationFn: async (request: ConditionCheckRequest) => {
      const response = await postConditionCheck(request);

      if (!response.isSuccess || !response.result) {
        throw new Error(response.message || '컨디션 체크 저장에 실패했습니다.');
      }

      return response.result;
    },
    onSuccess: async (checkedRecord) => {
      const checkedYearMonth = getYearMonth(checkedRecord.checkedOn);
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
      setCheckStep(4);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: conditionQueryKeys.currentWeek() }),
        queryClient.invalidateQueries({
          queryKey: monthlyRecordsQueryKey,
        }),
      ]);
    },
  });

  const handleOpenStartModal = () => {
    if (!currentWeekStatus.checkAvailable || currentWeekStatus.checked) return;
    setConditionCheckError(null);
    openCheckModal(currentWeekStatus.sundayIntakeWarningRequired, 1);
  };

  const handleContinueFromSunday = () => {
    setConditionCheckError(null);
    forceOpenCheckModal(1);
  };

  const handleStartCheck = () => {
    setConditionCheckError(null);
    setCheckStep(2);
  };
  const handleBackToStart = () => {
    setConditionCheckError(null);
    setCheckStep(1);
  };

  const handleNextVitalityStep = (selectedScore: number) => {
    try {
      validateConditionCheck(selectedScore, sleepHours, sleepMinutes);
      setConditionCheckError(null);
      setVitalityScore(selectedScore);
      setCheckStep(3);
    } catch (error) {
      setConditionCheckError(
        error instanceof Error ? error.message : '컨디션 입력값을 확인해 주세요.',
      );
    }
  };

  const handleBackToVitality = () => {
    setConditionCheckError(null);
    setCheckStep(2);
  };

  const handleCompleteSleepStep = async (sleepTime: { hours: number; minutes: number }) => {
    try {
      validateConditionCheck(vitalityScore, sleepTime.hours, sleepTime.minutes);
      setConditionCheckError(null);
      setSleepTime(sleepTime.hours, sleepTime.minutes);

      await conditionCheckMutation.mutateAsync({
        vitalityScore,
        sleepHours: sleepTime.hours,
        sleepMinutes: sleepTime.minutes,
      });
    } catch (error) {
      setConditionCheckError(
        error instanceof Error ? error.message : '컨디션 체크 저장에 실패했습니다.',
      );
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
    setConditionCheckError(null);
    closeCheckModal();
    if (checkStep === 4) return;
    void handleDismissPopup();
  };

  const handleCloseSundayModal = () => {
    closeSundayModal();
    void handleDismissPopup();
  };

  const handlePreviousMonth = () => {
    setSelectedYearMonth((previous) => {
      const { year, month } = previous ?? activeYearMonth;
      return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
    });
  };

  const handleNextMonth = () => {
    setSelectedYearMonth((previous) => {
      const { year, month } = previous ?? activeYearMonth;
      return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
    });
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
    conditionCheckError,
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
