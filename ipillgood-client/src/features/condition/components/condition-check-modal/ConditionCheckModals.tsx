'use client';

import { useConditionFlow } from '../../hooks/useConditionFlow';
import ConditionCheckStartModal from './ConditionCheckStartModal';
import ConditionVitalityModal from './ConditionVitalityModal';
import ConditionSleepTimeModal from './ConditionSleepTimeModal';
import ConditionCheckCompleteModal from './ConditionCheckCompleteModal';

const ConditionCheckModals = () => {
  const {
    isCheckModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    isSubmitting,
    closeCheckModal,
    handleStartCheck,
    handleBackToStart,
    handleNextVitalityStep,
    handleBackToVitality,
    handleCompleteSleepStep,
    handleBackToSleep,
    handleViewGraph,
  } = useConditionFlow();

  return (
    <>
      {/* 1단계 시작 팝업 모달 */}
      <ConditionCheckStartModal
        isOpen={isCheckModalOpen && checkStep === 1}
        onClose={closeCheckModal}
        onStart={handleStartCheck}
      />

      {/* 2단계 활력 선택 팝업 모달 */}
      <ConditionVitalityModal
        key={`vitality-${vitalityScore}`}
        isOpen={isCheckModalOpen && checkStep === 2}
        initialScore={vitalityScore}
        onBack={handleBackToStart}
        onClose={closeCheckModal}
        onNext={handleNextVitalityStep}
      />

      {/* 3단계 수면시간 선택 팝업 모달 */}
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
        onBack={handleBackToSleep}
        onClose={closeCheckModal}
        onViewGraph={handleViewGraph}
      />
    </>
  );
};

export default ConditionCheckModals;
