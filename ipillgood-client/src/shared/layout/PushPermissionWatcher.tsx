'use client';

import { usePushAlarmSettings } from '@/features/my/hooks/usePushAlarmSettings';
import { usePushPermissionSync } from '@/features/my/hooks/usePushPermissionSync';

// 앱 전역에서 브라우저 알림 권한 변경을 감지해서 서버 설정값을 동기화
const PushPermissionWatcher = () => {
  const { isPushAlarmOn, updatePushSetting } = usePushAlarmSettings();
  usePushPermissionSync(isPushAlarmOn, updatePushSetting);

  return null;
};

export default PushPermissionWatcher;
