import { postCabinetProducts } from '@/features/cabinet/api/cabinet';
import { getProductConflict } from '@/features/cabinet/api/conflict';
import { ProductConflict } from '@/features/cabinet/types/conflict';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useCabinetAddProducts = (selectedIds: number[]) => {
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
    onSuccess: (responses, productIds) => {
      const failedResponse = responses.find((response) => !response.isSuccess);

      if (failedResponse) {
        alert(failedResponse.message ?? '영양제 병용 여부를 확인하지 못했어요.');
        return;
      }

      const detectedConflicts = responses.flatMap((response) => response.result.conflicts);

      if (detectedConflicts.length === 0) {
        addProductsMutation.mutate({ productIds });
        return;
      }

      setConflicts(detectedConflicts);
      setIsWarningModalOpen(true);
    },
    onError: (error) => {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data.message
        : undefined;

      alert(message ?? '영양제 병용 여부를 확인하지 못했어요.');
    },
  });

  const handleAddClick = useCallback(() => {
    conflictCheckMutation.mutate(selectedIds);
  }, [conflictCheckMutation, selectedIds]);

  const handleWarningCancel = useCallback(() => {
    setIsWarningModalOpen(false);
    setConflicts([]);
  }, []);

  const handleWarningConfirm = useCallback(() => {
    addProductsMutation.mutate({ productIds: selectedIds });
  }, [addProductsMutation, selectedIds]);

  return {
    conflicts,
    isWarningModalOpen,
    isPending: addProductsMutation.isPending || conflictCheckMutation.isPending,
    handleAddClick,
    handleWarningCancel,
    handleWarningConfirm,
  };
};
