import { useState } from 'react';
import { mockMyUser } from '../mocks/user.mock';

export const useProfileForm = () => {
  const [nickname, setNickname] = useState(mockMyUser.nickname);
  const [isPasswordSheetOpen, setIsPasswordSheetOpen] = useState(false);

  const canChangePassword = mockMyUser.loginProviders.includes('LOCAL');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleOpenPasswordSheet = () => {
    setIsPasswordSheetOpen(true);
  };

  const handleSave = () => {
    console.log('닉네임 저장:', nickname);
  };

  return {
    nickname,
    canChangePassword,
    isPasswordSheetOpen,
    setIsPasswordSheetOpen,
    handleNicknameChange,
    handleOpenPasswordSheet,
    handleSave,
  };
};
