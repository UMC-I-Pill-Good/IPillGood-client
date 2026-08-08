import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getIntakeToday, patchPopUpShown, putIntakeTodayRecords } from '../api/intake';

export const intakeTodayQueryKey = ['intakeToday'];

export const useIntakeToday = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
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
      queryClient.invalidateQueries({ queryKey: ['intakeCalendar'] });
      queryClient.invalidateQueries({ queryKey: ['growthStage'] });
      setIsModalOpen(false);
    },

    onError: () => {
      alert('섭취 기록 저장에 실패했습니다.');
    },
  });

  const handleConfirm = (checkedIdList: number[]) => {
    recordsMutation.mutate({ takenActiveProductIds: checkedIdList });
  };

  return {
    allCompleted: data?.allCompleted,
    products: data?.scheduledProducts ?? [],
    isModalOpen,
    setIsModalOpen,
    handleConfirm,
    isConfirming: recordsMutation.isPending,
    isPending,
    isError,
  };
};
