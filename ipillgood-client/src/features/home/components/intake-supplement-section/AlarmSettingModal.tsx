import { IconButton, ModalShell, TextButton } from '@/shared/components';
import { X } from 'lucide-react';

interface AlarmSettingModalProps {
  onClose: () => void;
}

const AlarmSettingModal = ({ onClose }: AlarmSettingModalProps) => {
  return (
    <ModalShell onClose={onClose} ariaLabel='푸시 알림이 꺼져 있어요.'>
      <IconButton icon={<X size={22} />} ariaLabel='닫기' onClick={onClose} className='ml-auto' />
      <p className='text-center typo-body-9 mb-2'>푸시 알림이 꺼져 있어요.</p>
      <p className='text-center typo-caption-6 text-neutral-800 leading-4!'>
        푸시 알림을 켜면 이 영양제의
        <br />
        복용 시간 알림을 받을 수 있어요!
      </p>
      <TextButton
        type='button'
        text='알림 설정하러 가기'
        variant='primary'
        size='lg'
        href='/my/settings'
        onClick={onClose}
        className='mt-5 w-full'
      />
    </ModalShell>
  );
};

export default AlarmSettingModal;
