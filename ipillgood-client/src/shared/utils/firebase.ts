// Firebase 초기화 및 FCM(푸시 알림) 인스턴스 제공 유틸
import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
export const app = initializeApp(firebaseConfig);

// FCM 인스턴스 반환
export const getMessagingInstance = async () => {
  if (typeof window === 'undefined' || !(await isSupported())) return null;
  return getMessaging(app);
};
