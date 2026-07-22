import { useState } from 'react';

export const useWithdrawAction = (onWithdrawSuccess: () => void) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleToggleAgree = () => setIsAgreed((v) => !v);

  const handleClickWithdraw = () => {
    // TODO: 탈퇴 로직
    onWithdrawSuccess();
  };

  return { isAgreed, handleToggleAgree, handleClickWithdraw };
};
