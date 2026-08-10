'use client';

import { ToggleButton } from '@/shared/components';
import SectionCard from '../SectionCard';
import SectionItem from '../SectionItem';
import { usePushAlarmSettings } from '../../hooks/usePushAlarmSettings';
import { useFcmTokens } from '../../hooks/useFcmTokens';
import { useState } from 'react';
import PushPermissionDeniedModal from './PermissionDeniedModal';

const AlarmSettingSection = () => {
  const [isPermissionDeniedModalOpen, setIsPermissionDeniedModalOpen] = useState(false);
  const { isPushAlarmOn, handleTogglePushAlarm } = usePushAlarmSettings();
  const { handleRegisterFcmTokens } = useFcmTokens();

  const handleToggle = async () => {
    // 브라우저 알림 차단된 경우
    if (Notification.permission === 'denied') {
      setIsPermissionDeniedModalOpen(true);
      return;
    }

    // 브라우저 알림 권한 설정 전 -> FCM 토큰 등록까지 성공한 경우에만 서버 설정을 켬
    if (Notification.permission === 'default') {
      const { permission, isRegistered } = await handleRegisterFcmTokens();
      if (permission === 'denied') {
        setIsPermissionDeniedModalOpen(true);
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
        {isPushAlarmOn && <SectionItem label='복용 시간 알림' href='/my/settings/notifications' />}
      </SectionCard>
      {isPermissionDeniedModalOpen && (
        <PushPermissionDeniedModal onClose={() => setIsPermissionDeniedModalOpen(false)} />
      )}
    </>
  );
};

export default AlarmSettingSection;
