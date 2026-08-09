import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  getNotificationSettingsIntake,
  patchNotificationSettingsIntake,
  patchIntakeActiveProducts,
} from '../api/notification';
import { showToast } from '@/shared/utils';

export const intakeNotificationSettingsQueryKey = ['intakeNotificationSettings'];

export const useNotificationSettings = () => {
  const queryClient = useQueryClient();
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { data } = useQuery({
    queryKey: intakeNotificationSettingsQueryKey,
    queryFn: getNotificationSettingsIntake,
    select: (res) => res.result,
    staleTime: 1000 * 60 * 5,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: intakeNotificationSettingsQueryKey });

  const updateIntakePushMutation = useMutation({
    mutationFn: patchNotificationSettingsIntake,
    onSuccess: invalidate,
    onError: () => {
      showToast.error('알림 설정 변경에 실패했어요.');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({
      activeProductId,
      notificationEnabled,
    }: {
      activeProductId: number;
      notificationEnabled: boolean;
    }) => patchIntakeActiveProducts(activeProductId, { notificationEnabled }),
    onSuccess: invalidate,
    onError: () => {
      showToast.error('알림 설정 변경에 실패했어요.');
    },
  });

  const activeProducts = data?.activeProducts ?? [];
  const selectedProduct = activeProducts.find((p) => p.activeProductId === selectedProductId);

  const handleToggleIntakePush = () => {
    if (!data) return;
    updateIntakePushMutation.mutate({ intakePushEnabled: !data.intakePushEnabled });
  };

  const handleToggleProduct = (activeProductId: number) => {
    const product = activeProducts.find((p) => p.activeProductId === activeProductId);
    if (!product) return;
    updateProductMutation.mutate({
      activeProductId,
      notificationEnabled: !product.notificationEnabled,
    });
  };

  const handleSelectProduct = (activeProductId: number) => setSelectedProductId(activeProductId);

  const handleCloseProduct = () => setSelectedProductId(null);

  return {
    intakePushEnabled: data?.intakePushEnabled ?? false,
    activeProducts,
    selectedProduct,
    handleToggleIntakePush,
    handleToggleProduct,
    handleSelectProduct,
    handleCloseProduct,
  };
};
