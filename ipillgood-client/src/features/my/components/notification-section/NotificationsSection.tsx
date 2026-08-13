'use client';
import NotificationItem from './NotificationItem';
import NotificationCard from './NotificationCard';
import { useNotificationSettings } from '../../hooks/useNotificationSettings';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';
import { FetchError, LoadingSpinner, SupplementDetailBottomSheet } from '@/shared/components';
import { MascotSadIcon } from '@/assets';

const NotificationSection = () => {
  const { isPushAlarmOn, isPushAlarmLoading, isPushAlarmError, refetchPushAlarm } =
    usePushAlarmSettings();
  const {
    intakePushEnabled,
    activeProducts,
    selectedProduct,
    isLoading,
    isError,
    refetch,
    handleToggleIntakePush,
    handleToggleProduct,
    handleSelectProduct,
    handleCloseProduct,
  } = useNotificationSettings();

  if (isPushAlarmLoading || isLoading) return <LoadingSpinner />;

  if (isPushAlarmError || isError) {
    return (
      <FetchError
        description='알림 설정 정보를 불러오지 못했습니다.'
        onRetry={() => {
          refetchPushAlarm();
          refetch();
        }}
      />
    );
  }

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
        {activeProducts.length > 0 ? (
          activeProducts.map((product) => (
            <NotificationItem
              key={product.activeProductId}
              label={product.productName}
              isChecked={product.notificationEnabled}
              onToggle={() => handleToggleProduct(product.activeProductId)}
              disabled={!intakePushEnabled || !isPushAlarmOn}
              onClick={() => handleSelectProduct(product.activeProductId)}
            />
          ))
        ) : (
          <div className='mt-1 flex flex-col justify-between items-center px-5 py-5 pb-7.5 rounded-[30px] home-card-glass'>
            <MascotSadIcon />
            <p className='text-[18px] typo-title-gosanja text-primary-700'>
              현재 섭취 중인 영양제가 존재하지 않아요...
            </p>
          </div>
        )}
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
