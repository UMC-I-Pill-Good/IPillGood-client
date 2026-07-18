'use client';

import {
  ConditionCheckStartModal,
  ConditionVitalityModal,
  ConditionSleepTimeModal,
  ConditionGraphSection,
  ConditionHealthStatusSection,
  ConditionStatusBanner,
  ConditionSummarySection,
} from '@/features/condition/components';
import { useConditionStore } from '@/features/condition/store/useConditionStore';

const ConditionCheckPage = () => {
  const {
    isCheckModalOpen,
    checkStep,
    openCheckModal,
    closeCheckModal,
    setCheckStep,
  } = useConditionStore();

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
    console.log('선택된 활력 점수:', selectedScore);
    // 3단계 수면시간 선택 팝업으로 이동
    setCheckStep(3);
  };

  const handleBackToVitality = () => {
    // 2단계 활력 선택 팝업으로 복귀
    setCheckStep(2);
  };

  const handleCompleteSleepStep = (sleepTime: {
    hours: number;
    minutes: number;
  }) => {
    console.log('선택된 수면 시간:', sleepTime);
    // 4단계 완료 마스코트 팝업으로 이동 (추후 연결)
    closeCheckModal();
  };

  return (
    <main className='min-h-dvh bg-background'>
      <ConditionStatusBanner
        isCompleted={false}
        onOpenConditionCheck={handleOpenStartModal}
      />
      <ConditionGraphSection />
      <ConditionSummarySection />
      <ConditionHealthStatusSection />

      {/* 1단계 시작 팝업 모달 */}
      <ConditionCheckStartModal
        isOpen={isCheckModalOpen && checkStep === 1}
        onClose={closeCheckModal}
        onStart={handleStartCheck}
      />

      {/* 2단계 활력 선택 팝업 모달 (1/2단계) */}
      <ConditionVitalityModal
        isOpen={isCheckModalOpen && checkStep === 2}
        onBack={handleBackToStart}
        onClose={closeCheckModal}
        onNext={handleNextVitalityStep}
      />

      {/* 3단계 수면시간 선택 팝업 모달 (2/2단계) */}
      <ConditionSleepTimeModal
        isOpen={isCheckModalOpen && checkStep === 3}
        onBack={handleBackToVitality}
        onClose={closeCheckModal}
        onComplete={handleCompleteSleepStep}
      />
    </main>
  );
};

export default ConditionCheckPage;