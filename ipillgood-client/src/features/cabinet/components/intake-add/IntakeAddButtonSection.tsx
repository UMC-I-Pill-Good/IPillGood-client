'use client';

import { useAddIntakeProductsMutation } from '@/features/cabinet/hooks';
import { IntakeCycleModal, IntakeTimeModal, TextButton } from '@/shared/components';
import { useState } from 'react';
import { frequencyCycle } from '@/features/cabinet/constants/intake.constants';

interface IntakeAddButtonSectionProps {
  selectedIds: number[];
}

const IntakeAddButtonSection = ({ selectedIds }: IntakeAddButtonSectionProps) => {
  const [intakeTime, setIntakeTime] = useState<string | null>(null);
  const [isIntakeTimeModalOpen, setIsIntakeTimeModalOpen] = useState(false);
  const [isIntakeCycleModalOpen, setIsIntakeCycleModalOpen] = useState(false);

  const addIntakeProductsMutation = useAddIntakeProductsMutation();

  return (
    <>
      <section className='px-5 pt-4'>
        <TextButton
          type='button'
          text='섭취 중인 영양제로 추가하기'
          size='xl'
          className='w-full'
          disabled={selectedIds.length === 0 || addIntakeProductsMutation.isPending}
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
          onConfirm={(cycle) => {
            if (!intakeTime) return;

            addIntakeProductsMutation.mutate({
              memberProductIds: selectedIds,
              intakeTime,
              frequency: frequencyCycle[cycle],
            });
          }}
        />
      )}
    </>
  );
};

export default IntakeAddButtonSection;
