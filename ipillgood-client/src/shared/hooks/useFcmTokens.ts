import { useMutation } from '@tanstack/react-query';
import { postPushTokens, deletePushTokens } from '@/features/my/api/notification';
import { getMessagingInstance } from '@/shared/utils/firebase';
import { getToken } from 'firebase/messaging';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { isPushSupported } from '@/shared/utils';

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

  // 브라우저 알림 권한 요청 다이얼로그
  const requestNotificationPermission = async () => {
    // iOS 브라우저 탭 등 웹 푸시 미지원 환경에서는 Notification API가 없어 요청 자체가 불가능
    if (!isPushSupported()) return 'unsupported' as const;

    return Notification.requestPermission();
  };

  // 권한이 granted인 상태에서 FCM 토큰을 발급받아 서버에 등록
  const registerFcmToken = async () => {
    try {
      const messaging = await getMessagingInstance();
      if (!messaging) return false;

      // FCM 토큰 발급
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (!token) return false;

      // 발급받은 토큰을 서버에 등록해서 이 기기로 푸시를 보낼 수 있게 함
      await registerMutation.mutateAsync({ platform: 'WEB', token });

      return true;
    } catch {
      return false;
    }
  };

  return {
    requestNotificationPermission,
    registerFcmToken,
    isRegistering: registerMutation.isPending,
  };
};
