'use client';

import { TextButton } from '@/shared/components';
import LogoutModal from './LogoutModal';
import { mockMyUser } from '../../mocks/user.mock';
import { useLogoutModal } from '../../hooks/useLogoutModal';

const LogoutSection = () => {
  const { isOpen, openModal, closeModal, confirmLogout } = useLogoutModal();

  return (
    <div className='mt-auto mb-4'>
      <TextButton
        type='button'
        text='로그아웃'
        variant='primary'
        size='xl'
        className='w-full'
        onClick={openModal}
      />

      {isOpen && (
        <LogoutModal
          onConfirm={confirmLogout}
          onCancel={closeModal}
          nickname={mockMyUser.nickname}
        />
      )}
    </div>
  );
};

export default LogoutSection;
