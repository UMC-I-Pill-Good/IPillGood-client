'use client';

import { Input, TextButton } from '@/shared/components';
import { useProfileForm } from '../../hooks/useProfileForm';
import PasswordChangeSheet from './PasswordChangeSheet';

const ProfileSection = () => {
  const {
    nickname,
    canChangePassword,
    isPasswordSheetOpen,
    setIsPasswordSheetOpen,
    handleNicknameChange,
    handleOpenPasswordSheet,
    handleSave,
  } = useProfileForm();

  return (
    <section className='flex flex-col px-5 pt-4 flex-1 pb-20'>
      <h2 className='typo-body-5 text-black mb-8'>회원가입 시 입력한 정보를 수정할 수 있어요!</h2>

      <Input
        label='닉네임'
        value={nickname}
        onChange={handleNicknameChange}
        placeholder='닉네임을 입력해주세요.'
        inputClassName='px-6 py-2 text-neutral-800 font-medium!'
      />

      {canChangePassword && (
        <TextButton
          type='button'
          text='비밀번호 변경'
          variant='outline'
          size='xl'
          className='w-full mt-auto'
          onClick={handleOpenPasswordSheet}
        />
      )}

      <TextButton
        type='button'
        text='저장하기'
        variant='primary'
        size='xl'
        className='w-full mt-2.5'
        onClick={handleSave}
      />

      <PasswordChangeSheet open={isPasswordSheetOpen} onOpenChange={setIsPasswordSheetOpen} />
    </section>
  );
};

export default ProfileSection;
