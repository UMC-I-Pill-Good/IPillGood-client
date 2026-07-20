'use client';

import { useState, useEffect } from 'react';
import { useConditionStore } from '../store/useConditionStore';
import { getConditionSummary } from '../api/getConditionSummary';
import { postConditionCheck } from '../api/postConditionCheck';

export const useConditionFlow = () => {
  const {
    homeSummaryData,
    setHomeSummaryData,
    markWeekCompleted,
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // GET /conditions/summary API 호출 (스토어 데이터가 비어있을 때만 1회 호출)
  useEffect(() => {
    if (homeSummaryData.monthlyGraph.length === 0) {
      getConditionSummary('2026-05')
        .then((res) => {
          if (res.isSuccess && res.result) {
            setHomeSummaryData(res.result);
          }
        })
        .catch((err) => {
          console.error('컨디션 홈 요약 조회 중 오류:', err);
        });
    }
  }, [homeSummaryData.monthlyGraph.length, setHomeSummaryData]);

  // 컨디션 체크 시작 핸들러 (스토어 전역 openCheckModal에서 일요일 여부 자동 판단)
  const handleOpenStartModal = () => {
    openCheckModal(1);
  };

  // 일요일 경고 모달에서 '계속하기' 클릭 시 정상 체크 팝업 오픈
  const handleContinueFromSunday = () => {
    forceOpenCheckModal(1);
  };

  const handleStartCheck = () => {
    setCheckStep(2);
  };

  const handleBackToStart = () => {
    setCheckStep(1);
  };

  const handleNextVitalityStep = (selectedScore: number) => {
    setVitalityScore(selectedScore);
    setCheckStep(3);
  };

  const handleBackToVitality = () => {
    setCheckStep(2);
  };

  const handleCompleteSleepStep = async (sleepTime: {
    hours: number;
    minutes: number;
  }) => {
    setSleepTime(sleepTime.hours, sleepTime.minutes);

    try {
      setIsSubmitting(true);
      const response = await postConditionCheck({
        conditionScore: vitalityScore,
        sleepHours: sleepTime.hours,
        sleepMinutes: sleepTime.minutes,
      });

      if (response.isSuccess) {
        markWeekCompleted();
        setCheckStep(4);
      }
    } catch (error) {
      console.error('컨디션 체크 제출 중 오류 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToSleep = () => {
    setCheckStep(3);
  };

  const handleViewGraph = () => {
    closeCheckModal();
  };

  return {
    homeSummaryData,
    isCheckModalOpen,
    isSundayModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    isSubmitting,
    closeCheckModal,
    closeSundayModal,
    handleOpenStartModal,
    handleContinueFromSunday,
    handleStartCheck,
    handleBackToStart,
    handleNextVitalityStep,
    handleBackToVitality,
    handleCompleteSleepStep,
    handleBackToSleep,
    handleViewGraph,
  };
};
