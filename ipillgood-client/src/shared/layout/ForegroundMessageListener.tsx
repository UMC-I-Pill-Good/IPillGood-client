'use client';

import { useForegroundMessage } from '@/features/my/hooks/useForegroundMessage';

// 앱 전역에서 포그라운드 푸시 메시지를 감지해 알림으로 표시
const ForegroundMessageListener = () => {
  useForegroundMessage();

  return null;
};

export default ForegroundMessageListener;
