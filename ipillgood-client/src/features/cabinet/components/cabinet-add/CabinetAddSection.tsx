'use client';

import { TextButton } from '@/shared/components';
import { memo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';
import { postCabinetProducts } from '@/features/cabinet/api/cabinet';
import { useRouter } from 'next/navigation';

interface CabinetAddSectionProps {
  selectedIds: number[];
}

const CabinetAddSection = ({ selectedIds }: CabinetAddSectionProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
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

  return (
    <>
      <section className='shrink-0 px-5 pb-28 pt-4'>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          size='xl'
          className='w-full'
          disabled={selectedIds.length === 0 || addProductsMutation.isPending}
          onClick={() => setIsWarningModalOpen(true)}
        />
      </section>

      {isWarningModalOpen && (
        <InteractionWarningModal
          onCancel={() => setIsWarningModalOpen(false)}
          onConfirm={() => {
            addProductsMutation.mutate({ productIds: selectedIds });
          }}
          isdDuplication={true}
        />
      )}
    </>
  );
};

export default memo(CabinetAddSection);
