'use client';

import { useState, useEffect } from 'react';
import {
  ConditionCheckStartModal,
  ConditionVitalityModal,
  ConditionSleepTimeModal,
  ConditionCheckCompleteModal,
  ConditionGraphSection,
  ConditionHealthStatusSection,
  ConditionStatusBanner,
  ConditionSummarySection,
} from '@/features/condition/components';
import { postConditionCheck } from '@/features/condition/api/postConditionCheck';
import { getConditionSummary } from '@/features/condition/api/getConditionSummary';
import { type ConditionHomeSummaryResult } from '@/features/condition/types/condition';
import { useConditionStore } from '@/features/condition/store/useConditionStore';

const ConditionCheckPage = () => {
  const {
    isCheckModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    openCheckModal,
    closeCheckModal,
    setCheckStep,
    setVitalityScore,
    setSleepTime,
  } = useConditionStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homeSummaryData, setHomeSummaryData] =
    useState<ConditionHomeSummaryResult>({
      currentWeekCompleted: false,
      monthlyGraph: [],
      monthlySummary: {
        avgVitalityScore: 3.0,
        avgSleepHours: 4.5,
        intakeDays: 3,
        intakeTotalDays: 7,
      },
    });

  // GET /conditions/summary API 호출 (홈 화면 조회)
  useEffect(() => {
    getConditionSummary('2026-05')
      .then((res) => {
        if (res.isSuccess && res.result) {
          setHomeSummaryData(res.result);
        }
      })
      .catch((err) => {
        console.error('컨디션 홈 요약 조회 중 오류:', err);
      });
  }, []);

  const handleOpenStartModal = () => {
    openCheckModal(1);
  };

  const handleStartCheck = () => {
    // 2단계 활력 선택 팝업으로 이동
    setCheckStep(2);
  };

  const handleBackToStart = () => {
    // 1단계 시작 팝업으로 복귀
    setCheckStep(1);
  };

  const handleNextVitalityStep = (selectedScore: number) => {
    // 선택한 활력 점수를 전역 스토어에 보관 (뒤로가기 시 보존)
    setVitalityScore(selectedScore);
    // 3단계 수면시간 선택 팝업으로 이동
    setCheckStep(3);
  };

  const handleBackToVitality = () => {
    // 2단계 활력 선택 팝업으로 복귀 (이전 선택했던 점수 유지)
    setCheckStep(2);
  };

  const handleCompleteSleepStep = async (sleepTime: {
    hours: number;
    minutes: number;
  }) => {
    // 선택한 수면시간/분을 전역 스토어에 보관
    setSleepTime(sleepTime.hours, sleepTime.minutes);

    try {
      setIsSubmitting(true);

      // [POST /conditions API 제출]
      const response = await postConditionCheck({
        conditionScore: vitalityScore,
        sleepHours: sleepTime.hours,
        sleepMinutes: sleepTime.minutes,
      });

      if (response.isSuccess) {
        console.log('컨디션 제출 성공:', response.result);

        // 이번 주 완료 상태로 갱신
        setHomeSummaryData((prev) => ({
          ...prev,
          currentWeekCompleted: true,
        }));

        // 4단계 완료 축하 팝업으로 이동
        setCheckStep(4);
      }
    } catch (error) {
      console.error('컨디션 체크 제출 중 오류 발생:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewGraph = () => {
    closeCheckModal();
  };

  const { currentWeekCompleted, monthlySummary } = homeSummaryData;

  return (
    <main className='min-h-dvh bg-background'>
      {/* 이번 주 컨디션 완료 여부 배너 (GET /conditions/summary 데이터 연동) */}
      <ConditionStatusBanner
        isCompleted={currentWeekCompleted}
        onOpenConditionCheck={handleOpenStartModal}
      />
      <ConditionGraphSection />

      {/* 이번 달 요약 섹션 (GET /conditions/summary 데이터 연동) */}
      <ConditionSummarySection
        averageVitality={monthlySummary.avgVitalityScore ?? 3}
        averageSleepHours={monthlySummary.avgSleepHours ?? 4.5}
        intakeDays={monthlySummary.intakeDays}
        totalDays={monthlySummary.intakeTotalDays}
      />

      <ConditionHealthStatusSection />

      {/* 1단계 시작 팝업 모달 */}
      <ConditionCheckStartModal
        isOpen={isCheckModalOpen && checkStep === 1}
        onClose={closeCheckModal}
        onStart={handleStartCheck}
      />

      {/* 2단계 활력 선택 팝업 모달 (1/2단계) */}
      <ConditionVitalityModal
        key={`vitality-${vitalityScore}`}
        isOpen={isCheckModalOpen && checkStep === 2}
        initialScore={vitalityScore}
        onBack={handleBackToStart}
        onClose={closeCheckModal}
        onNext={handleNextVitalityStep}
      />

      {/* 3단계 수면시간 선택 팝업 모달 (2/2단계) */}
      <ConditionSleepTimeModal
        key={`sleep-${sleepHours}-${sleepMinutes}`}
        isOpen={isCheckModalOpen && checkStep === 3}
        initialHours={sleepHours}
        initialMinutes={sleepMinutes}
        isSubmitting={isSubmitting}
        onBack={handleBackToVitality}
        onClose={closeCheckModal}
        onComplete={handleCompleteSleepStep}
      />

      {/* 4단계 완료 축하 마스코트 팝업 모달 */}
      <ConditionCheckCompleteModal
        isOpen={isCheckModalOpen && checkStep === 4}
        userName='아필굿'
        onClose={closeCheckModal}
        onViewGraph={handleViewGraph}
      />
    </main>
  );
};

export default ConditionCheckPage;