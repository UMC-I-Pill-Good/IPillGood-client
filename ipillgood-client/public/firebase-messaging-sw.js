// CDN SDK 로드
importScripts('https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBKvd9BFp2znOjd4GhiZIL-rrLyhxErnCk',
  authDomain: 'ipillgood-dev.firebaseapp.com',
  projectId: 'ipillgood-dev',
  storageBucket: 'ipillgood-dev.firebasestorage.app',
  messagingSenderId: '468498872243',
  appId: '1:468498872243:web:6734c5f64948e8b0b0bdc6',
});

firebase.messaging();

// 알림 클릭 시 payload의 targetRoute로 이동(포그라운드 용)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const rawTargetRoute = event.notification.data?.targetRoute || '/';

  // 외부 출처로 이동시키는 오픈 리다이렉트를 막기 위해 same-origin인지 검증
  let targetUrl = self.location.origin + '/';
  try {
    const url = new URL(rawTargetRoute, self.location.origin);
    if (url.origin === self.location.origin) {
      targetUrl = url.href;
    }
  } catch {
    // targetRoute가 유효한 URL이 아니면 기본 경로로 이동
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === targetUrl && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});
