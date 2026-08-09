'use client';

import { useConditionStore } from '../store/useConditionStore';
import { validateConditionCheck } from '../utils/conditionValidation';
import { useConditionCheckMutation } from './useConditionCheckMutation';
import { useConditionPopupLog } from './useConditionPopupLog';
import { useConditionQueries } from './useConditionQueries';

export const useConditionFlow = () => {
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
  const {
    homeSummaryData,
    currentWeekStatus,
    isMonthlyRecordsFetching,
    handlePreviousMonth,
    handleNextMonth,
  } = useConditionQueries();
  const conditionCheckMutation = useConditionCheckMutation({
    onCompleted: () => setCheckStep(4),
  });
  const { dismissCurrentWeekPopup } = useConditionPopupLog({
    currentWeekStatus,
    openCheckModal,
  });

  const handleOpenStartModal = () => {
    if (!currentWeekStatus.checkAvailable || currentWeekStatus.checked) return;
    openCheckModal(currentWeekStatus.sundayIntakeWarningRequired, 1);
  };

  const handleNextVitalityStep = (selectedScore: number) => {
    try {
      validateConditionCheck(selectedScore, sleepHours, sleepMinutes);
      setVitalityScore(selectedScore);
      setCheckStep(3);
    } catch {
      return;
    }
  };

  const handleCompleteSleepStep = (sleepTime: { hours: number; minutes: number }) => {
    try {
      validateConditionCheck(vitalityScore, sleepTime.hours, sleepTime.minutes);
    } catch {
      return;
    }

    setSleepTime(sleepTime.hours, sleepTime.minutes);
    conditionCheckMutation.mutate({
      vitalityScore,
      sleepHours: sleepTime.hours,
      sleepMinutes: sleepTime.minutes,
    });
  };

  const handleCloseCheckModal = () => {
    closeCheckModal();
    if (checkStep === 4) return;
    void dismissCurrentWeekPopup();
  };

  const handleCloseSundayModal = () => {
    closeSundayModal();
    void dismissCurrentWeekPopup();
  };

  return {
    homeSummaryData,
    currentWeekStatus,
    isMonthlyRecordsFetching,
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
    handleContinueFromSunday: () => forceOpenCheckModal(1),
    handleStartCheck: () => setCheckStep(2),
    handleBackToStart: () => setCheckStep(1),
    handleNextVitalityStep,
    handleBackToVitality: () => setCheckStep(2),
    handleCompleteSleepStep,
    handleBackToSleep: () => setCheckStep(3),
    handleViewGraph: closeCheckModal,
    handlePreviousMonth,
    handleNextMonth,
  };
};
