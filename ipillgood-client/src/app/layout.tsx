import localFont from 'next/font/local';
import './globals.css';
import type { Metadata } from 'next';
import { QueryProvider } from '@/app/_providers/QueryProvider';
import { Toast } from '@/shared/components';

export const metadata: Metadata = {
  title: 'I Pill Good',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '아필굿',
  },
  icons: {
    apple: '/favicon.ico',
  },
  description: '사용자 맞춤 영양제 추천 서비스',
};

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} antialiased`}>
        <QueryProvider>
          <Toast />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
