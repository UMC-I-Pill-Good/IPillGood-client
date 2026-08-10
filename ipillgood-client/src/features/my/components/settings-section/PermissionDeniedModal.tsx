'use client';

import { ModalShell, TextButton } from '@/shared/components';

interface PushPermissionDeniedModalProps {
  onClose: () => void;
}

const PushPermissionDeniedModal = ({ onClose }: PushPermissionDeniedModalProps) => {
  return (
    <ModalShell className='w-90' onClose={onClose} ariaLabel='알림 권한이 꺼져 있어요.'>
      <p className='text-center typo-body-9 mb-2'>알림 권한이 꺼져 있어요</p>
      <p className='text-center typo-caption-6 text-neutral-800'>
        브라우저에서 알림이 차단되어 있어 푸시 알림을 켤 수 없어요.
        <br />
        <span className='text-primary'>브라우저 설정 &gt; 사이트 권한</span>에서 알림을
        허용해주세요.
      </p>
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
