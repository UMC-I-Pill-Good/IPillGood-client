import { useEffect } from 'react';
import { isPushSupported } from '@/shared/utils';

/*
 * 서버 설정은 켜져있는데(pushEnabled: true) 브라우저 알림 권한이 'granted'가 아니면
 * 실제로 알림을 못 받는 상태이므로, 서버 값도 false로 맞춰서 진짜로 꺼버림.
 *
 * 사용자의 명시적인 토글 액션과 무관하게, 브라우저 권한이 외부에서
 * (주소창 사이트 설정, 브라우저 설정 등) 바뀌는 것을 감지해서 자동으로 동기화한다.
 */
export const usePushPermissionSync = (
  pushEnabled: boolean | undefined,
  updatePushSetting: (variables: { pushEnabled: boolean }) => void,
) => {
  useEffect(() => {
    // iOS 브라우저 탭처럼 웹 푸시 미지원 환경에서는 Notification API 자체가 없어서
    // 권한을 읽을 수 없다. 이 경우는 '거부됨'이 아니라 '판단 불가'이므로,
    // 홈 화면 PWA에서 켜둔 서버 설정을 여기서 꺼버리지 않도록 그대로 둔다.
    if (!isPushSupported()) return;

    const syncIfRevoked = () => {
      if (pushEnabled && Notification.permission !== 'granted') {
        updatePushSetting({ pushEnabled: false });
      }
    };

    // 1) 마운트 시 / data가 갱신될 때 1차로 즉시 체크
    //    (예: 페이지 로드 시점에 이미 권한이 꺼져있는 경우)
    syncIfRevoked();

    // 2) 탭이 다시 보여질 때(visibilitychange) 재체크
    //    브라우저 알림 권한은 보통 이 탭 밖(주소창 사이트 설정, 브라우저 설정 등)에서
    //    바뀌기 때문에, 그 설정 화면을 갔다가 이 탭으로 돌아오는 순간을 감지해서
    //    최신 권한 상태를 다시 확인함.
    document.addEventListener('visibilitychange', syncIfRevoked);

    // 3) Permissions API로 실시간 변경 감지
    //    탭을 벗어나지 않고도 권한이 바뀌는 즉시 onchange 이벤트가 발생함.
    let permissionStatus: PermissionStatus | undefined;
    navigator.permissions?.query({ name: 'notifications' as PermissionName }).then((status) => {
      permissionStatus = status;
      status.onchange = syncIfRevoked;
    });

    return () => {
      document.removeEventListener('visibilitychange', syncIfRevoked);
      if (permissionStatus) permissionStatus.onchange = null;
    };
  }, [pushEnabled, updatePushSetting]);
};
