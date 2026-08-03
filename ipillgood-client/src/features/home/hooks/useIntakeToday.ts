import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getIntakeToday, patchPopUpShown, putIntakeTodayRecords } from '../api/intake';

export const intakeTodayQueryKey = ['intakeToday'];

export const useIntakeToday = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: intakeTodayQueryKey,
    queryFn: getIntakeToday,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  const needAutoPopup = !!data?.autoPopupRequired && !data?.autoPopupShown;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevNeedAutoPopup, setPrevNeedAutoPopup] = useState(needAutoPopup);

  if (needAutoPopup !== prevNeedAutoPopup) {
    setPrevNeedAutoPopup(needAutoPopup);
    if (needAutoPopup) {
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    if (needAutoPopup) {
      patchPopUpShown();
    }
  }, [needAutoPopup]);

  const recordsMutation = useMutation({
    mutationFn: putIntakeTodayRecords,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
      setIsModalOpen(false);
    },
    onError: () => {
      alert('섭취 기록 저장에 실패했습니다.');
    },
  });

  const handleConfirm = (checkedIdList: number[]) => {
    recordsMutation.mutate({ takenActiveProductIds: checkedIdList });
  };

  const pendingProducts = useMemo(
    () => data?.scheduledProducts.filter((p) => !p.taken) ?? [],
    [data?.scheduledProducts],
  );

  return {
    allCompleted: data?.allCompleted,
    pendingProducts,
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    isConfirming: recordsMutation.isPending,
  };
};
