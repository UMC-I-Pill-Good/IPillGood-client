import localFont from 'next/font/local';
import './globals.css';
import type { Metadata } from 'next';
import { QueryProvider } from '@/app/_providers/QueryProvider';
import { Toast } from '@/shared/components';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ipillgood.store'),
  title: 'I Pill Good',
  description:
    '건강 상태와 생활 습관을 바탕으로 나에게 맞는 영양제를 추천하고 관리하는 맞춤형 건강 서비스, 아필굿',
  applicationName: '아필굿',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '아필굿',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '아필굿',
    title: '아필굿 | 나에게 딱 맞는 영양제 추천 서비스',
    description:
      '건강 상태와 생활 습관을 바탕으로 나에게 맞는 영양제를 추천하고 관리하는 맞춤형 건강 서비스, 아필굿',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '아필굿 | 나에게 딱 맞는 영양제 추천 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: '아필굿 | 나에게 딱 맞는 영양제 추천 서비스',
    description:
      '건강 상태와 생활 습관을 바탕으로 나에게 맞는 영양제를 추천하고 관리하는 맞춤형 건강 서비스, 아필굿',
    images: {
      url: '/og-image.png',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

const gosanja = localFont({
  src: '../assets/fonts/Gosanja.woff2',
  display: 'swap',
  weight: '400',
  variable: '--font-gosanja',
  preload: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} ${gosanja.variable} antialiased`}>
        <QueryProvider>
          <Toast />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
