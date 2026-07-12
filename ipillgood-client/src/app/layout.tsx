import localFont from 'next/font/local';
import './globals.css';
import { Metadata } from 'next';
import { QueryProvider } from '@/app/_providers/QueryProvider';

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

const dmSans = localFont({
  src: '../assets/fonts/DMSans-VariableFont_opsz,wght.ttf',
  display: 'swap',
  weight: '100 900',
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} ${dmSans.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
