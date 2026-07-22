import { useState } from 'react';
import { MOCK_NOTIFICATION_SETTINGS } from '../mocks/notification.mock';
import type { IntakeNotificationSettingType } from '../types/notification.type';

export const useNotificationSettings = () => {
  // TODO: 상태 가져오기
  const [intakePushEnabled, setIntakePushEnabled] = useState(
    MOCK_NOTIFICATION_SETTINGS.intakePushEnabled,
  );
  const [activeProducts, setActiveProducts] = useState<IntakeNotificationSettingType[]>(
    MOCK_NOTIFICATION_SETTINGS.activeProducts,
  );
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const selectedProduct = activeProducts.find((p) => p.activeProductId === selectedProductId);

  const handleToggleIntakePush = () => {
    // TODO: 로직
    setIntakePushEnabled((v) => !v);
  };

  const handleToggleProduct = (activeProductId: number) => {
    // TODO: 로직
    setActiveProducts((prev) =>
      prev.map((p) =>
        p.activeProductId === activeProductId
          ? { ...p, notificationEnabled: !p.notificationEnabled }
          : p,
      ),
    );
  };

  const handleSelectProduct = (activeProductId: number) => setSelectedProductId(activeProductId);

  return {
    intakePushEnabled,
    activeProducts,
    selectedProduct,
    handleToggleIntakePush,
    handleToggleProduct,
    handleSelectProduct,
  };
};
