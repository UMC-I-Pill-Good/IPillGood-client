'use client';
import NotificationItem from './NotificationItem';
import NotificationCard from './NotificationCard';
import { useNotificationSettings } from '../../hooks/useNotificationSettings';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';
import { SupplementDetailBottomSheet } from '@/shared/components';

const NotificationSection = () => {
  const { isPushAlarmOn } = usePushAlarmSettings();
  const {
    intakePushEnabled,
    activeProducts,
    selectedProduct,
    handleToggleIntakePush,
    handleToggleProduct,
    handleSelectProduct,
    handleCloseProduct,
  } = useNotificationSettings();

  return (
    <section className='flex flex-col px-5 py-4 gap-8 pb-28.5'>
      <p className='typo-body-6 text-neutral-800'>섭취 중인 영양제의 알림을 설정해 보세요.</p>

      <NotificationCard title='전체 알림 ON/OFF'>
        <NotificationItem
          label='복용 알림 ON/OFF'
          isChecked={intakePushEnabled}
          onToggle={handleToggleIntakePush}
          disabled={!isPushAlarmOn}
        />
      </NotificationCard>

      <NotificationCard title='현재 섭취 중인 영양제'>
        {activeProducts.map((product) => (
          <NotificationItem
            key={product.activeProductId}
            label={product.productName}
            isChecked={product.notificationEnabled}
            onToggle={() => handleToggleProduct(product.activeProductId)}
            disabled={!intakePushEnabled || !isPushAlarmOn}
            onClick={() => handleSelectProduct(product.activeProductId)}
          />
        ))}
      </NotificationCard>

      <SupplementDetailBottomSheet
        open={!!selectedProduct}
        onOpenChange={(open) => {
          if (!open) handleCloseProduct();
        }}
        memberProductId={selectedProduct?.memberProductId ?? null}
      />
    </section>
  );
};

export default NotificationSection;
