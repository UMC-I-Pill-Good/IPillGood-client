import { invalidateActiveProductQueries } from '@/shared/utils/invalidateMemberProductQueries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteActiveProduct, getActiveProducts } from '../api/intake';
import { showToast } from '@/shared/utils';

export const useIntakeSupplement = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['activeProducts'],
    queryFn: getActiveProducts,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteActiveProduct,
    onSuccess: () => {
      invalidateActiveProductQueries(queryClient, {
        includeCabinetSearch: true,
        includeNotificationSettings: true,
      });

      showToast.success('섭취 중인 영양제에서 삭제됐어요.');
    },
    onError: () => {
      showToast.error('삭제에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const handleDeleteConfirm = () => {
    if (deleteTargetId === null) return;

    deleteMutation.mutate(deleteTargetId);
    setDeleteTargetId(null);
  };

  return {
    list: data?.activeProducts ?? [],
    deleteTargetId,
    setDeleteTargetId,
    handleDeleteConfirm,
  };
};
