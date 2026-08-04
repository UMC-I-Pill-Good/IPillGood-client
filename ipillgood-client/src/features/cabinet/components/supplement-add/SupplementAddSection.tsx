'use client';

import { postCabinetProducts } from '@/features/cabinet/api/cabinet';
import { TextButton } from '@/shared/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { memo } from 'react';

interface SupplementAddSectionProps {
  selectedIds: number[];
}

const SupplementAddSection = ({ selectedIds }: SupplementAddSectionProps) => {
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
    <section className='shrink-0 px-5 pb-28 pt-4'>
      <TextButton
        type='button'
        text='캐비닛에 추가하기'
        size='xl'
        className='w-full'
        disabled={selectedIds.length === 0 || addProductsMutation.isPending}
        onClick={() => addProductsMutation.mutate({ productIds: selectedIds })}
      />
    </section>
  );
};

export default memo(SupplementAddSection);
