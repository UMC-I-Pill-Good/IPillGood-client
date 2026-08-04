'use client';

import { deleteCabinetProducts } from '@/features/cabinet/api/cabinet';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
import { ConfirmModal, TextButton } from '@/shared/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonSectionProps {
  selectedIds: number[];
}

const DeleteButtonSection = ({ selectedIds }: DeleteButtonSectionProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteProductsMutation = useMutation({
    mutationFn: deleteCabinetProducts,
    onSuccess: (res) => {
      if (!res.isSuccess) {
        alert(res.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['cabinetProductsSearch'] });
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
      setIsDeleteModalOpen(false);
      router.replace('/cabinet');
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '캐비닛 영양제를 삭제하지 못했어요.');
    },
  });

  return (
    <section className=' px-5 py-4'>
      <TextButton
        type='button'
        text='삭제하기'
        size='xl'
        className='w-full'
        disabled={selectedIds.length === 0 || deleteProductsMutation.isPending}
        onClick={() => setIsDeleteModalOpen(true)}
      />

      {isDeleteModalOpen && (
        <ConfirmModal
          title='해당 영양제를 정말 삭제하시겠습니까?'
          content='삭제한 영양제는 복구가 어렵습니다.'
          cancelLabel='아니요'
          confirmLabel='네'
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            if (deleteProductsMutation.isPending) return;
            deleteProductsMutation.mutate(selectedIds);
          }}
          contentClassName='text-semantic'
        />
      )}
    </section>
  );
};

export default DeleteButtonSection;
