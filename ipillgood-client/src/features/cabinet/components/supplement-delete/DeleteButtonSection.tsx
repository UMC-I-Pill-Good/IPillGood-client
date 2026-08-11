'use client';

import { deleteCabinetProducts } from '@/features/cabinet/api/cabinet';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
import { ConfirmModal, TextButton } from '@/shared/components';
import { showToast } from '@/shared/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
        showToast.error(res.message);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
      queryClient.invalidateQueries({ queryKey: ['cabinetProductsSearch'] });
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
      setIsDeleteModalOpen(false);

      showToast.success('캐비닛에서 삭제됐어요.');
      router.replace('/cabinet');
    },
    onError: () => {
      showToast.error('삭제에 실패했어요. 다시 시도해 주세요.');
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
