import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { getMessagingInstance } from '@/shared/utils/firebase';

// 탭이 포그라운드(활성 상태)일 때는 서비스워커가 알림을 자동으로 띄워주지 않으므로
// 클라이언트에서 직접 메시지를 받아 알림으로 표시
export const useForegroundMessage = () => {
  useEffect(() => {
    // effect가 정리된 뒤에 getMessagingInstance()가 뒤늦게 resolve되면서
    // 리스너가 등록되는 것을 막기 위한 플래그
    let isActive = true;
    let unsubscribe: (() => void) | undefined;

    getMessagingInstance().then((messaging) => {
      if (!messaging || !isActive) return;

      unsubscribe = onMessage(messaging, (payload) => {
        const { notification } = payload;
        if (!notification) return;

        // new Notification()은 Android Chrome 등 모바일 브라우저에서 지원하지 않으므로
        // 서비스워커의 showNotification()으로 데스크톱/모바일 모두에서 표시
        navigator.serviceWorker
          .getRegistration('/firebase-cloud-messaging-push-scope')
          .then((registration) => {
            if (!registration) return;

            registration.showNotification(notification.title ?? '', {
              body: notification.body,
              icon: notification.icon,
            });
          });
      });
    });

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, []);
};
