'use client';

import { ToggleButton } from '@/shared/components';
import SectionCard from '../SectionCard';
import SectionItem from '../SectionItem';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';
import { useFcmTokens } from '../../hooks/useFcmTokens';
import { useState } from 'react';
import PushPermissionDeniedModal, {
  type PushPermissionModalVariant,
} from './PermissionDeniedModal';
import { isPushSupported } from '@/shared/utils';

const AlarmSettingSection = () => {
  const [modalVariant, setModalVariant] = useState<PushPermissionModalVariant | null>(null);
  const { isPushAlarmOn, handleTogglePushAlarm } = usePushAlarmSettings();
  const { handleRegisterFcmTokens } = useFcmTokens();

  const handleToggle = async () => {
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

    // 브라우저 알림 권한 설정 전 -> FCM 토큰 등록까지 성공한 경우에만 서버 설정을 켬
    if (Notification.permission === 'default') {
      const { permission, isRegistered } = await handleRegisterFcmTokens();
      if (permission === 'denied') {
        setModalVariant('denied');
      }
      if (permission !== 'granted' || !isRegistered) return;
    }
    handleTogglePushAlarm();
  };

  const AlertRight = <ToggleButton isChecked={isPushAlarmOn ?? false} onClick={handleToggle} />;

  return (
    <>
      <SectionCard title='알림 설정'>
        <SectionItem label='푸시 알림' right={AlertRight} />
        {/* {isPushAlarmOn && <SectionItem label='복용 시간 알림' href='/my/settings/notifications' />} */}
        <SectionItem label='복용 시간 알림' href='/my/settings/notifications' />
      </SectionCard>
      {modalVariant && (
        <PushPermissionDeniedModal variant={modalVariant} onClose={() => setModalVariant(null)} />
      )}
    </>
  );
};

export default AlarmSettingSection;
