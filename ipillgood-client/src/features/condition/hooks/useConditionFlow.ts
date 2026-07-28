'use client';

import { useState, useEffect } from 'react';
import { useConditionStore } from '../store/useConditionStore';
import { getConditionSummary } from '../api/getConditionSummary';
import { getConditionCurrentWeek } from '../api/getConditionCurrentWeek';
import { postConditionCheck } from '../api/postConditionCheck';
import { postConditionPopupAutoShown } from '../api/postConditionPopupAutoShown';
import { patchConditionPopupDismissed } from '../api/patchConditionPopupDismissed';

export const useConditionFlow = () => {
  const {
    homeSummaryData,
    setHomeSummaryData,
    currentWeekStatus,
    setCurrentWeekStatus,
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

  // GET /api/v1/conditions/current-week API 호출
  useEffect(() => {
    getConditionCurrentWeek()
      .then((res) => {
        if (res.isSuccess && res.result) {
          setCurrentWeekStatus(res.result);
        }
      })
      .catch((err) => {
        console.error('이번 주 컨디션 상태 조회 중 오류:', err);
      });
  }, [setCurrentWeekStatus]);

  // 자동 팝업 노출 감지 및 노출 이력 전송
  useEffect(() => {
    if (currentWeekStatus.autoPopupAvailable && !currentWeekStatus.checked) {
      openCheckModal(1);
      postConditionPopupAutoShown()
        .then((res) => {
          if (res.isSuccess) {
            console.log('자동 팝업 노출 기록 성공:', res.result);
          }
        })
        .catch((err) => {
          console.error('자동 팝업 노출 기록 실패:', err);
        });
    }
  }, [currentWeekStatus.autoPopupAvailable, currentWeekStatus.checked, openCheckModal]);

  // GET /api/v1/conditions/monthly-records API 호출 (스토어 데이터가 비어있을 때만 1회 호출)
  useEffect(() => {
    if (homeSummaryData.records.length === 0) {
      getConditionSummary(2026, 7)
        .then((res) => {
          if (res.isSuccess && res.result) {
            setHomeSummaryData(res.result);
          }
        })
        .catch((err) => {
          console.error('컨디션 홈 요약 조회 중 오류:', err);
        });
    }
  }, [homeSummaryData.records.length, setHomeSummaryData]);

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
        vitalityScore: vitalityScore,
        sleepHours: sleepTime.hours,
        sleepMinutes: sleepTime.minutes,
        intakeDaysCount: 6, // API 연동 전 임시 복용 일수 더미값 주입
      });

      if (response.isSuccess && response.result) {
        markWeekCompleted(response.result.recordId);
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

  const handleCloseCheckModal = () => {
    closeCheckModal();
    if (!currentWeekStatus.checked) {
      patchConditionPopupDismissed()
        .then((res) => {
          if (res.isSuccess) {
            console.log('팝업 닫힘 기록 성공:', res.result);
          }
        })
        .catch((err) => {
          console.error('팝업 닫힘 기록 실패:', err);
        });
    }
  };

  const handleCloseSundayModal = () => {
    closeSundayModal();
    if (!currentWeekStatus.checked) {
      patchConditionPopupDismissed()
        .then((res) => {
          if (res.isSuccess) {
            console.log('팝업 닫힘 기록 성공:', res.result);
          }
        })
        .catch((err) => {
          console.error('팝업 닫힘 기록 실패:', err);
        });
    }
  };

  return {
    homeSummaryData,
    currentWeekStatus,
    isCheckModalOpen,
    isSundayModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    isSubmitting,
    closeCheckModal: handleCloseCheckModal,
    closeSundayModal: handleCloseSundayModal,
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

