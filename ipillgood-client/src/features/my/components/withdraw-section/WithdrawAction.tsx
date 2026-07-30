'use client';

import { useState } from 'react';
import { CheckboxButton, TextButton } from '@/shared/components';
import { useWithdraw } from '../../hooks/useWithdraw';

interface WithdrawActionProps {
  onWithdrawSuccess: () => void;
}

const WithdrawAction = ({ onWithdrawSuccess }: WithdrawActionProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const { handleClickWithdraw, isWithdrawing } = useWithdraw(onWithdrawSuccess);

  const handleToggleAgree = () => setIsAgreed((v) => !v);

  return (
    <>
      <label className='flex px-5 gap-1 items-center'>
        <CheckboxButton checked={isAgreed} onClick={handleToggleAgree} />
        <span className='typo-caption-2 text-black'>
          위 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다.
        </span>
      </label>

      <TextButton
        type='button'
        variant='semantic'
        text='탈퇴하기'
        size='xl'
        onClick={handleClickWithdraw}
        disabled={!isAgreed || isWithdrawing}
        className='w-full mt-auto'
      />
    </>
  );
};

export default WithdrawAction;
