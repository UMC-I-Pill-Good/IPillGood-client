import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { getMessagingInstance } from '@/shared/utils/firebase';

// 포그라운드 알림 표시
export const useForegroundMessage = () => {
  useEffect(() => {
    // effect가 정리된 뒤에 getMessagingInstance()가 뒤늦게 resolve되면서
    // 리스너가 등록되는 것을 막기 위한 플래그
    let isActive = true;
    let unsubscribe: (() => void) | undefined;

    getMessagingInstance().then((messaging) => {
      if (!messaging || !isActive) return;

      unsubscribe = onMessage(messaging, (payload) => {
        const { notification, data } = payload;
        if (!notification) return;

        navigator.serviceWorker
          .getRegistration('/firebase-cloud-messaging-push-scope')
          .then((registration) => {
            if (!registration) return;

            registration.showNotification(notification.title ?? '', {
              body: notification.body,
              icon: notification.icon ?? '/notification.png',
              data: { targetRoute: data?.targetRoute },
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
