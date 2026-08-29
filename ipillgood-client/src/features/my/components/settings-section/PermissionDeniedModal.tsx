'use client';

import { ModalShell, TextButton } from '@/shared/components';

export type PushPermissionModalVariant = 'denied' | 'unsupported';

interface PushPermissionDeniedModalProps {
  onClose: () => void;
  variant?: PushPermissionModalVariant;
}

// denied: 브라우저에서 알림을 차단한 경우
// unsupported: iOS 브라우저 탭처럼 웹 푸시 API 자체가 없는 경우
//              (iOS는 홈 화면에 추가한 PWA에서만 알림을 받을 수 있음)
const COPY = {
  denied: {
    title: '알림 권한이 꺼져 있어요',
    body: (
      <>
        브라우저에서 알림이 차단되어 있어 푸시 알림을 켤 수 없어요.
        <br />
        <span className='text-primary'>브라우저 설정 &gt; 사이트 권한</span>에서 알림을
        허용해주세요.
      </>
    ),
  },
  unsupported: {
    title: '이 브라우저에서는 알림을 켤 수 없어요',
    body: (
      <>
        iPhone·iPad는 홈 화면에 추가한 앱에서만 알림을 받을 수 있어요.
        <br />
        <span className='text-primary'>공유 &gt; 홈 화면에 추가</span> 후 다시 시도해주세요.
      </>
    ),
  },
} as const;

const PushPermissionDeniedModal = ({
  onClose,
  variant = 'denied',
}: PushPermissionDeniedModalProps) => {
  const { title, body } = COPY[variant];

  return (
    <ModalShell className='w-90' onClose={onClose} ariaLabel={title}>
      <p className='text-center typo-body-9 mb-2'>{title}</p>
      <p className='text-center typo-caption-6 text-neutral-800'>{body}</p>
      <TextButton
        type='button'
        text='확인'
        variant='primary'
        size='lg'
        onClick={onClose}
        className='mt-5 w-full'
      />
    </ModalShell>
  );
};

export default PushPermissionDeniedModal;
