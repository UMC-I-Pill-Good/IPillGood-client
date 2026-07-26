'use client';
import NotificationItem from './NotificationItem';
import NotificationCard from './NotificationCard';
import { useNotificationSettings } from '../../hooks/useNotificationSettings';

const NotificationSection = () => {
  const {
    intakePushEnabled,
    activeProducts,
    selectedProduct,
    handleToggleIntakePush,
    handleToggleProduct,
    handleSelectProduct,
  } = useNotificationSettings();

  // TODO: 푸시 알림이 OFF일때 전체 알림 OFF
  return (
    <section className='flex flex-col px-5 py-4 gap-8'>
      <p className='typo-body-6 text-neutral-800'>섭취 중인 영양제의 알림을 설정해 보세요.</p>

      <NotificationCard title='전체 알림 ON/OFF'>
        <NotificationItem
          label='복용 알림 ON/OFF'
          isChecked={intakePushEnabled}
          onToggle={handleToggleIntakePush}
        />
      </NotificationCard>

      <NotificationCard title='현재 섭취 중인 영양제'>
        {activeProducts.map((product) => (
          <NotificationItem
            key={product.activeProductId}
            label={product.productName}
            isChecked={product.notificationEnabled}
            onToggle={() => handleToggleProduct(product.activeProductId)}
            disabled={!intakePushEnabled}
            onClick={() => handleSelectProduct(product.activeProductId)}
          />
        ))}
      </NotificationCard>

      {/* TODO: 개별 영양제 모달 추가 */}
      {selectedProduct && <></>}
    </section>
  );
};

export default NotificationSection;
