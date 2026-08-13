import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getIntakeToday, patchPopUpShown, putIntakeTodayRecords } from '../api/intake';
import { showToast } from '@/shared/utils';

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
      queryClient.invalidateQueries({ queryKey: ['intakeDays'] });
      setIsModalOpen(false);
      showToast.success('저장되었습니다.');
    },

    onError: () => {
      showToast.error('섭취 기록에 실패했어요. 다시 시도해 주세요.');
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
