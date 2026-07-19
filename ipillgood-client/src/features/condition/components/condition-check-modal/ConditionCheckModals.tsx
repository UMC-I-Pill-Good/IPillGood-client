'use client';

import { useConditionFlow } from '../../hooks/useConditionFlow';
import ConditionCheckStartModal from './ConditionCheckStartModal';
import ConditionVitalityModal from './ConditionVitalityModal';
import ConditionSleepTimeModal from './ConditionSleepTimeModal';
import ConditionCheckCompleteModal from './ConditionCheckCompleteModal';

interface ConditionCheckModalsProps {
  userName?: string;
}

const ConditionCheckModals = ({
  userName = '아필굿',
}: ConditionCheckModalsProps) => {
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

  if (!isCheckModalOpen) {
    return null;
  }

  return (
    <>
      {/* 1단계 시작 팝업 모달 */}
      {checkStep === 1 && (
        <ConditionCheckStartModal
          isOpen={true}
          onClose={closeCheckModal}
          onStart={handleStartCheck}
        />
      )}

      {/* 2단계 활력 선택 팝업 모달 */}
      {checkStep === 2 && (
        <ConditionVitalityModal
          key={`vitality-${vitalityScore}`}
          isOpen={true}
          initialScore={vitalityScore}
          onBack={handleBackToStart}
          onClose={closeCheckModal}
          onNext={handleNextVitalityStep}
        />
      )}

      {/* 3단계 수면시간 선택 팝업 모달 */}
      {checkStep === 3 && (
        <ConditionSleepTimeModal
          key={`sleep-${sleepHours}-${sleepMinutes}`}
          isOpen={true}
          initialHours={sleepHours}
          initialMinutes={sleepMinutes}
          isSubmitting={isSubmitting}
          onBack={handleBackToVitality}
          onClose={closeCheckModal}
          onComplete={handleCompleteSleepStep}
        />
      )}

      {/* 4단계 완료 축하 마스코트 팝업 모달 */}
      {checkStep === 4 && (
        <ConditionCheckCompleteModal
          isOpen={true}
          userName={userName}
          onBack={handleBackToSleep}
          onClose={closeCheckModal}
          onViewGraph={handleViewGraph}
        />
      )}
    </>
  );
};

export default ConditionCheckModals;
