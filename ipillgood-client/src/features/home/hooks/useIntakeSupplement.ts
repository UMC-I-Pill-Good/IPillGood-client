import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteActiveProduct, getActiveProducts } from '../api/intake';
import { intakeTodayQueryKey } from './useIntakeToday';

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
      queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
    },
    onError: () => {
      alert('영양제 삭제에 실패했습니다.');
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
