'use client';

import { CheckboxButton, TextButton } from '@/shared/components';
import { useWithdrawAction } from '@/features/my/hooks/useWithdrawAction';

interface WithdrawActionProps {
  onWithdrawSuccess: () => void;
}

const WithdrawAction = ({ onWithdrawSuccess }: WithdrawActionProps) => {
  const { isAgreed, handleToggleAgree, handleClickWithdraw } = useWithdrawAction(onWithdrawSuccess);

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
        disabled={!isAgreed}
        className='w-full mt-auto'
      />
    </>
  );
};

export default WithdrawAction;
