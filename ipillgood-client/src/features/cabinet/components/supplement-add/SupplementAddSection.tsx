'use client';

import { TextButton } from '@/shared/components';
import { memo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';
import { postCabinetProducts } from '@/features/cabinet/api/cabinet';

interface SupplementAddSectionProps {
  selectedIds: number[];
}

const SupplementAddSection = ({ selectedIds }: SupplementAddSectionProps) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const queryClient = useQueryClient();

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
    },
    onError: () => {
      alert('캐비닛에 영양제를 추가하지 못했어요.');
    },
  });

  console.log(selectedIds);

  return (
    <>
      <section className='px-5 mt-auto'>
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

export default memo(SupplementAddSection);
