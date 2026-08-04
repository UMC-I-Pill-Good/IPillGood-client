'use client';

import { TextButton } from '@/shared/components';
import { memo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';
import { postCabinetProducts } from '@/features/cabinet/api/cabinet';
import { getProductConflict } from '@/features/cabinet/api/conflict';
import { ProductConflict } from '@/features/cabinet/types/conflict';
import { useRouter } from 'next/navigation';

interface CabinetAddSectionProps {
  selectedIds: number[];
}

const CabinetAddSection = ({ selectedIds }: CabinetAddSectionProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [conflicts, setConflicts] = useState<ProductConflict[]>([]);
  const queryClient = useQueryClient();

  const router = useRouter();

  const addProductsMutation = useMutation({
    mutationFn: postCabinetProducts,
    onSuccess: (res) => {
      if (!res.isSuccess) {
        alert(res.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['cabinetProductsSearch'] });
      setIsWarningModalOpen(false);

      router.push('/cabinet');
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '캐비닛에 영양제를 추가하지 못했어요.');
    },
  });

  const conflictCheckMutation = useMutation({
    mutationFn: (productIds: number[]) => Promise.all(productIds.map(getProductConflict)),
    onSuccess: (responses) => {
      const failedResponse = responses.find((response) => !response.isSuccess);

      if (failedResponse) {
        alert(failedResponse.message ?? '영양제 병용 여부를 확인하지 못했어요.');
        return;
      }

      const detectedConflicts = responses.flatMap((response) => response.result.conflicts);

      if (detectedConflicts.length === 0) {
        addProductsMutation.mutate({ productIds: selectedIds });
        return;
      }

      setConflicts(detectedConflicts);
      setIsWarningModalOpen(true);
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '병용 금기 여부를 확인에 실패했습니다.');
    },
  });

  return (
    <>
      <section className='shrink-0 px-5 pb-28 pt-4'>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          size='xl'
          className='w-full'
          disabled={
            selectedIds.length === 0 ||
            addProductsMutation.isPending ||
            conflictCheckMutation.isPending
          }
          onClick={() => conflictCheckMutation.mutate(selectedIds)}
        />
      </section>

      {isWarningModalOpen && (
        <InteractionWarningModal
          conflicts={conflicts}
          onCancel={() => {
            setIsWarningModalOpen(false);
            setConflicts([]);
          }}
          onConfirm={() => {
            addProductsMutation.mutate({ productIds: selectedIds });
          }}
        />
      )}
    </>
  );
};

export default memo(CabinetAddSection);
