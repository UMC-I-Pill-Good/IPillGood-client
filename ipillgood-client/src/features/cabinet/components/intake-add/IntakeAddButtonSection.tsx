'use client';

import { postIntakeProduct } from '@/features/cabinet/api/intake';
import { IntakeCycleModal, IntakeTimeModal, TextButton } from '@/shared/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { frequencyCycle } from '@/features/cabinet/constants/intake.constants';

interface IntakeAddButtonSectionProps {
  selectedIds: number[];
}

const IntakeAddButtonSection = ({ selectedIds }: IntakeAddButtonSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [intakeTime, setIntakeTime] = useState<string | null>(null);
  const [isIntakeTimeModalOpen, setIsIntakeTimeModalOpen] = useState(false);
  const [isIntakeCycleModalOpen, setIsIntakeCycleModalOpen] = useState(false);

  const addIntakeProductsMutation = useMutation({
    mutationFn: ({
      memberProductIds,
      intakeTime,
      frequency,
    }: {
      memberProductIds: number[];
      intakeTime: string;
      frequency: string;
    }) =>
      Promise.all(
        memberProductIds.map((memberProductId) =>
          postIntakeProduct({ memberProductId, intakeTime, frequency }),
        ),
      ),
    onSuccess: (responses) => {
      const failedResponse = responses.find((response) => !response.isSuccess);

      if (failedResponse) {
        alert(failedResponse.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: ['intakeToday'] });
      router.push('/cabinet');
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '섭취 중인 영양제로 추가하지 못했어요.');
    },
  });

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
