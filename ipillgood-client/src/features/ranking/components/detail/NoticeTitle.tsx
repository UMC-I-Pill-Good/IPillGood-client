import { DetailWarningIcon } from '@/assets';
import type { ReactNode } from 'react';

interface NoticeTitleProps {
  children: ReactNode;
}

const NoticeTitle = ({ children }: NoticeTitleProps) => (
  <div className='flex min-w-0 items-center gap-1'>
    <DetailWarningIcon aria-hidden='true' className='size-[17px] shrink-0' />
    <h2 className='min-w-0 leading-tight typo-caption-1 text-semantic-600'>{children}</h2>
  </div>
);

export default NoticeTitle;