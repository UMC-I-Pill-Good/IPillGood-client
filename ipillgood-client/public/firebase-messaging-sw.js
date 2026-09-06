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

  const targetRoute = event.notification.data?.targetRoute || '/';
  const targetUrl = self.location.origin + targetRoute;

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
