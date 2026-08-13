'use client';

import { TextButton } from '@/shared/components';
import LogoutModal from './LogoutModal';
import { useMyInfoQuery } from '@/shared/hooks';
import { useState } from 'react';
import { useLogout } from '../../hooks/useLogout';

const LogoutSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useMyInfoQuery();
  const { handleLogout, isLoggingOut } = useLogout(() => setIsOpen(false));

  return (
    <div className='mt-auto mb-4'>
      <TextButton
        type='button'
        text='로그아웃'
        variant='primary'
        size='xl'
        className='w-full'
        onClick={() => setIsOpen(true)}
      />

      {isOpen && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setIsOpen(false)}
          nickname={data?.nickname ?? '회원'}
          isPending={isLoggingOut}
        />
      )}
    </div>
  );
};

export default LogoutSection;
