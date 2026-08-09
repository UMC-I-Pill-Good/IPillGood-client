import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { getMessagingInstance } from '@/shared/utils/firebase';

// 탭이 포그라운드(활성 상태)일 때는 서비스워커가 알림을 자동으로 띄워주지 않으므로
// 클라이언트에서 직접 메시지를 받아 알림으로 표시
export const useForegroundMessage = () => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getMessagingInstance().then((messaging) => {
      if (!messaging) return;

      unsubscribe = onMessage(messaging, (payload) => {
        if (!payload.notification) return;

        new Notification(payload.notification.title ?? '', {
          body: payload.notification.body,
          icon: payload.notification.icon,
        });
      });
    });

    return () => unsubscribe?.();
  }, []);
};
