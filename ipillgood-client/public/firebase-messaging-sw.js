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

// 앱이 안 열려있을 때 날아오는 푸시는 notification 필드 기반으로 브라우저가 자동으로 알림을 띄움
firebase.messaging();
