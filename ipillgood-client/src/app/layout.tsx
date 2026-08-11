import localFont from 'next/font/local';
import './globals.css';
import { Metadata } from 'next';
import { QueryProvider } from '@/app/_providers/QueryProvider';
import { Toast } from '@/shared/components';

export const metadata: Metadata = {
  title: 'I Pill Good',
  description: '사용자 맞춤 영양제 추천 서비스',
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
