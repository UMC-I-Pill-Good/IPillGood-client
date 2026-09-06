'use client';

import { ToggleButton } from '@/shared/components';
import SectionCard from '../SectionCard';
import SectionItem from '../SectionItem';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';
import { useFcmTokens } from '@/shared/hooks';
import { useState } from 'react';
import PushPermissionDeniedModal, {
  type PushPermissionModalVariant,
} from './PermissionDeniedModal';
import { isPushSupported, showToast } from '@/shared/utils';

const AlarmSettingSection = () => {
  const [modalVariant, setModalVariant] = useState<PushPermissionModalVariant | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimisticOn, setOptimisticOn] = useState(false);
  const { isPushAlarmOn, handleTogglePushAlarm } = usePushAlarmSettings();
  const { requestNotificationPermission, registerFcmToken } = useFcmTokens();

  const handleToggle = async () => {
    if (isProcessing || isPushAlarmOn === undefined) return; // 처리 중이거나 설정값 로드 전이면 재클릭 무시

    // iOS 브라우저 탭처럼 웹 푸시 미지원 환경
    // Notification API 자체가 없어서 권한 팝업이 뜰 수 없으므로 안내만 띄움
    if (!isPushSupported()) {
      setModalVariant('unsupported');
      return;
    }

    // 브라우저 알림 차단된 경우
    if (Notification.permission === 'denied') {
      setModalVariant('denied');
      return;
    }

    setIsProcessing(true);

    // 브라우저 알림 권한 설정 전 -> 허용을 받은 뒤에만 FCM 토큰 등록을 진행
    if (Notification.permission === 'default') {
      const permission = await requestNotificationPermission();

      if (permission !== 'granted') {
        setIsProcessing(false);
        if (permission === 'denied') {
          setModalVariant('denied');
        }
        return;
      }

      // 허용 클릭된 시점부터 낙관적으로 on 표시, 서버 등록은 이어서 백그라운드로 진행
      setOptimisticOn(true);
      const isRegistered = await registerFcmToken();

      if (!isRegistered) {
        setIsProcessing(false);
        setOptimisticOn(false);
        showToast.error('알림 등록에 실패했어요. 다시 시도해 주세요.');
        return;
      }
    }
    // 서버 값이 갱신된 뒤에 처리 상태와 낙관적 상태를 함께 해제해서 깜빡임 없이 전환
    handleTogglePushAlarm(() => {
      setIsProcessing(false);
      setOptimisticOn(false);
    });
  };

  const AlertRight = (
    <ToggleButton
      isChecked={optimisticOn || (isPushAlarmOn ?? false)}
      onClick={handleToggle}
      disabled={isProcessing}
    />
  );

  return (
    <>
      <SectionCard title='알림 설정'>
        <SectionItem label='푸시 알림' right={AlertRight} />
        <SectionItem label='복용 시간 알림' href='/my/settings/notifications' />
      </SectionCard>
      {modalVariant && (
        <PushPermissionDeniedModal variant={modalVariant} onClose={() => setModalVariant(null)} />
      )}
    </>
  );
};

export default AlarmSettingSection;
