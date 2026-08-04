'use client';

import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';

import { frequencyCycle } from '@/features/cabinet/constants/intake.constants';
import { useAddIntakeProducts } from '@/features/cabinet/hooks';
import { IntakeCycleModal, IntakeTimeModal, TextButton } from '@/shared/components';
import { useState } from 'react';
import ReAdditionWarningModal from '../modal/ReadditionWarningModal';

interface IntakeAddButtonSectionProps {
  selectedIds: number[];
}

const IntakeAddButtonSection = ({ selectedIds }: IntakeAddButtonSectionProps) => {
  const [intakeTime, setIntakeTime] = useState<string | null>(null);
  const [isIntakeTimeModalOpen, setIsIntakeTimeModalOpen] = useState(false);
  const [isIntakeCycleModalOpen, setIsIntakeCycleModalOpen] = useState(false);
  const {
    conflicts,
    isWarningModalOpen,
    isReAdditionWarningModalOpen,
    isPending,
    checkConflictsAndAdd,
    confirmAdd,
    cancelAdd,
    closeReAdditionWarningModal,
  } = useAddIntakeProducts();

  const handleCycleConfirm = (cycle: string) => {
    if (!intakeTime) return;

    setIsIntakeCycleModalOpen(false);
    checkConflictsAndAdd({
      memberProductIds: selectedIds,
      intakeTime,
      frequency: frequencyCycle[cycle],
    });
  };

  return (
    <>
      <section className='px-5 pt-4'>
        <TextButton
          type='button'
          text='섭취 중인 영양제로 추가하기'
          size='xl'
          className='w-full'
          disabled={selectedIds.length === 0 || isPending}
          onClick={() => setIsIntakeTimeModalOpen(true)}
        />
      </section>

      {isIntakeTimeModalOpen && (
        <IntakeTimeModal
          onCancel={() => setIsIntakeTimeModalOpen(false)}
          onConfirm={(selectedIntakeTime) => {
            setIntakeTime(selectedIntakeTime);
            setIsIntakeTimeModalOpen(false);
            setIsIntakeCycleModalOpen(true);
          }}
        />
      )}

      {isIntakeCycleModalOpen && (
        <IntakeCycleModal
          onCancel={() => setIsIntakeCycleModalOpen(false)}
          onConfirm={handleCycleConfirm}
        />
      )}

      {isWarningModalOpen && (
        <InteractionWarningModal
          conflicts={conflicts}
          onCancel={cancelAdd}
          onConfirm={confirmAdd}
        />
      )}

      {isReAdditionWarningModalOpen && (
        <ReAdditionWarningModal
          onConfirm={closeReAdditionWarningModal}
          onCancel={closeReAdditionWarningModal}
        />
      )}
    </>
  );
};

export default IntakeAddButtonSection;
