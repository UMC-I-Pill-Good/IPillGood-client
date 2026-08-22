// 현재 실행 환경이 웹 푸시(FCM)를 지원하는지 판별하는 유틸

/** iOS/iPadOS 여부 (iPadOS 13+는 UA가 Macintosh로 잡혀서 터치 포인트로 보정) */
export const isIos = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
};

/** 홈 화면에 추가된 PWA(standalone)로 실행 중인지 */
export const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
};

/**
 * 웹 푸시 지원 여부.
 * iOS는 16.4+부터, 그것도 홈 화면에 추가한 standalone 상태에서만 지원한다.
 * 일반 iOS 브라우저 탭에는 window.Notification 자체가 없어서
 * Notification.permission을 읽는 순간 ReferenceError가 발생한다.
 */
export const isPushSupported = () =>
  typeof window !== 'undefined' &&
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window;
