'use client';

import { useConditionContext } from '../ConditionProvider';
import ConditionCheckStartModal from './ConditionCheckStartModal';
import ConditionVitalityModal from './ConditionVitalityModal';
import ConditionSleepTimeModal from './ConditionSleepTimeModal';
import ConditionCheckCompleteModal from './ConditionCheckCompleteModal';
import ConditionSundayIntakeModal from './ConditionSundayIntakeModal';
import { useMyInfo } from '@/features/my/hooks/useMyInfo';

interface ConditionCheckModalsProps {
  userName?: string;
}

const ConditionCheckModals = ({ userName = '아필굿' }: ConditionCheckModalsProps) => {
  const { data: myInfo } = useMyInfo();
  const displayUserName = myInfo?.nickname ?? userName;
  const {
    isCheckModalOpen,
    isSundayModalOpen,
    checkStep,
    vitalityScore,
    sleepHours,
    sleepMinutes,
    isSubmitting,
    closeCheckModal,
    closeSundayModal,
    handleContinueFromSunday,
    handleStartCheck,
    handleBackToStart,
    handleNextVitalityStep,
    handleBackToVitality,
    handleCompleteSleepStep,
    handleViewGraph,
  } = useConditionContext();

  return (
    <>
      {/* 0단계 일요일 영양제 미섭취 경고 모달 (isSundayModalOpen 일 때만 렌더링하여 스크롤 락 방지) */}
      {isSundayModalOpen && (
        <ConditionSundayIntakeModal
          isOpen={true}
          onClose={closeSundayModal}
          onContinue={handleContinueFromSunday}
        />
      )}

      {/* 컨디션 체크 시작/진행 모달들 */}
      {isCheckModalOpen && (
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
              userName={displayUserName}
              onClose={closeCheckModal}
              onViewGraph={handleViewGraph}
            />
          )}
        </>
      )}
    </>
  );
};

export default ConditionCheckModals;
