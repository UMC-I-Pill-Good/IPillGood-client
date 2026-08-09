import { useMutation } from '@tanstack/react-query';
import { postPushTokens, deletePushTokens } from '../api/notification';
import { getMessagingInstance } from '@/shared/utils/firebase';
import { getToken } from 'firebase/messaging';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export const useFcmTokens = () => {
  const { getPushTokenId, setPushTokenId } = useLocalStorage();

  // 로그아웃 시 서버에서 이 토큰을 삭제할 수 있도록 등록된 pushTokenId를 저장해둠
  const registerMutation = useMutation({
    mutationFn: postPushTokens,
    onSuccess: async (data) => {
      // 권한이 재설정되어 다시 등록하는 경우, 이전에 등록해둔 토큰이 남아있다면
      // 고아로 남지 않도록 서버에서 먼저 삭제하고 새 토큰으로 교체
      const prevPushTokenId = getPushTokenId();
      if (prevPushTokenId) {
        await deletePushTokens(Number(prevPushTokenId)).catch(() => {});
      }

      setPushTokenId(data.result.pushTokenId);
    },
  });

  const handleRegisterFcmTokens = async () => {
    // 브라우저 알림 권한 요청 다이얼로그
    const permission = await Notification.requestPermission();

    // 'granted'가 아니면(denied 또는 default) FCM 토큰 등록 없이 여기서 종료
    // denied로 인한 서버 값 동기화는 앱 전역 PushPermissionWatcher가 처리
    if (permission !== 'granted') {
      return { permission, isRegistered: false };
    }

    try {
      const messaging = await getMessagingInstance();
      if (!messaging) return { permission, isRegistered: false };

      // FCM 토큰 발급
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (!token) return { permission, isRegistered: false };

      // 발급받은 토큰을 서버에 등록해서 이 기기로 푸시를 보낼 수 있게 함
      await registerMutation.mutateAsync({ platform: 'WEB', token });

      return { permission, isRegistered: true };
    } catch {
      return { permission, isRegistered: false };
    }
  };

  return { handleRegisterFcmTokens, isRegistering: registerMutation.isPending };
};
