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
      {isSundayModalOpen && (
        <ConditionSundayIntakeModal
          isOpen={true}
          onClose={closeSundayModal}
          onContinue={handleContinueFromSunday}
        />
      )}

      {isCheckModalOpen && (
        <>
          {checkStep === 1 && (
            <ConditionCheckStartModal
              isOpen={true}
              onClose={closeCheckModal}
              onStart={handleStartCheck}
            />
          )}

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
