'use client';

import { deleteActiveProduct } from '@/features/home/api/intake';
import { intakeTodayQueryKey } from '@/features/home/hooks/useIntakeToday';
import {
  intakeNotificationSettingsQueryKey,
  useNotificationSettings,
} from '@/features/my/hooks/useNotificationSettings';
import { usePushAlarmSettings } from '@/features/my/hooks/usePushAlarmSettings';
import { showToast } from '@/shared/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { getCabinetProductsDetail } from '../api/cabinet';
import { frequencyCycle } from '../constants/intake.constants';
import { useAddIntakeProducts } from './useAddIntakeProducts';
import { usePatchIntakeProductMutation } from './usePatchIntakeProductMutation';

interface UseSupplementDetailBottomSheetParams {
  open: boolean;
  memberProductId: number | null;
}

export const useSupplementDetailBottomSheet = ({
  open,
  memberProductId,
}: UseSupplementDetailBottomSheetParams) => {
  const [isOpenIntakeCycleModal, setIsOpenIntakeCycleModal] = useState(false);
  const [isOpenIntakeTimeModal, setIsOpenIntakeTimeModal] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [newIntakeTime, setNewIntakeTime] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['cabinetProductDetail', memberProductId],
    queryFn: () => getCabinetProductsDetail(memberProductId!),
    enabled: open && memberProductId !== null,
  });

  const patchActiveProductMutation = usePatchIntakeProductMutation();

  const invalidateIntakeQueries = () => {
    queryClient.invalidateQueries({ queryKey: ['cabinetProducts'] });
    queryClient.invalidateQueries({ queryKey: ['activeProducts'] });
    queryClient.invalidateQueries({ queryKey: intakeTodayQueryKey });
    queryClient.invalidateQueries({ queryKey: intakeNotificationSettingsQueryKey });
    queryClient.invalidateQueries({ queryKey: ['intakeCalendar'] });
    queryClient.invalidateQueries({ queryKey: ['growthStage'] });
    queryClient.invalidateQueries({ queryKey: ['cabinetProductDetail'] });
  };

  const {
    conflicts,
    isWarningModalOpen,
    isPending: isAddingActiveProduct,
    checkConflictsAndAdd,
    confirmAdd,
    cancelAdd,
  } = useAddIntakeProducts({
    onSuccess: invalidateIntakeQueries,
  });

  const deleteActiveProductMutation = useMutation({
    mutationFn: deleteActiveProduct,
    onSuccess: () => {
      invalidateIntakeQueries();
      showToast.success('섭취 중인 영양제에서 삭제됐어요.');
      setIsDeleteConfirmModalOpen(false);
    },
    onError: () => showToast.error('삭제에 실패했어요. 다시 시도해 주세요.'),
  });

  const { isPushAlarmOn } = usePushAlarmSettings();
  const { intakePushEnabled } = useNotificationSettings();


  const activeProduct = data?.result.activeProduct;
  const notificationEnabled = activeProduct?.notificationEnabled ?? false;
  const intakeHour = activeProduct ? Number(activeProduct.intakeTime.split(':')[0]) : null;
  const intakeTimeLabel = activeProduct
    ? `${intakeHour !== null && intakeHour >= 12 ? '오후' : '오전'} ${activeProduct.intakeTime}`
    : '';

  const updateActiveProduct = (
    body: {
      intakeTime?: string;
      frequency?: string;
      notificationEnabled?: boolean;
    },
    messages?: { successMessage?: string; errorMessage?: string },
  ) => {
    if (!activeProduct) return;

    patchActiveProductMutation.mutate({
      activeProductId: activeProduct.activeProductId,
      body: {
        intakeTime: body.intakeTime ?? activeProduct.intakeTime,
        frequency: body.frequency ?? activeProduct.frequency,
        notificationEnabled: body.notificationEnabled ?? notificationEnabled,
      },
      successMessage: messages?.successMessage,
      errorMessage: messages?.errorMessage,
    });
  };

  const handleNewIntakeCycleConfirm = (cycle: string) => {
    if (isAddingActiveProduct || !newIntakeTime || memberProductId === null) return;

    checkConflictsAndAdd(
      {
        memberProductIds: [memberProductId],
        intakeTime: newIntakeTime,
        frequency: frequencyCycle[cycle],
      },
      () => setIsOpenIntakeCycleModal(false),
    );
  };


  return {
    data,
    activeProduct,
    notificationEnabled,
    intakeTimeLabel,
    isOpenIntakeCycleModal,
    isOpenIntakeTimeModal,
    isDeleteConfirmModalOpen,
    isAddingActiveProduct,
    isPushAlarmOn,
    intakePushEnabled,
    conflicts,
    isWarningModalOpen,
    deleteActiveProductMutation,
    setIsOpenIntakeCycleModal,
    setIsOpenIntakeTimeModal,
    setIsDeleteConfirmModalOpen,
    setNewIntakeTime,
    updateActiveProduct,
    handleNewIntakeCycleConfirm,
    confirmAdd,
    cancelAdd,
  };
};
