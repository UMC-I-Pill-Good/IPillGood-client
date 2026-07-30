'use client';

import { Input, TextButton } from '@/shared/components';
import BottomSheet from '@/shared/components/modal/BottomSheet';
import { usePasswordChange } from '../../hooks/usePasswordChange';

interface PasswordChangeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordChangeSheet = ({ open, onOpenChange }: PasswordChangeSheetProps) => {
  const { register, errors, isValid, isSubmitting, handlePasswordSubmit } = usePasswordChange(
    open,
    onOpenChange,
  );

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handlePasswordSubmit} className='flex flex-col pt-4 pb-4'>
        <p className='typo-subtitle-4 text-black text-center mb-8'>비밀번호 변경</p>

        <Input
          type='password'
          hasPasswordToggle
          label='현재 비밀번호'
          placeholder='현재 비밀번호를 입력해주세요.'
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <Input
          type='password'
          hasPasswordToggle
          label='새 비밀번호'
          placeholder='영문, 숫자 포함 8~16자'
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <Input
          type='password'
          hasPasswordToggle
          label='새 비밀번호 확인'
          placeholder='새 비밀번호를 다시 입력해주세요.'
          error={errors.newPasswordConfirm?.message}
          {...register('newPasswordConfirm')}
        />

        <TextButton
          type='submit'
          text='변경 완료'
          variant='primary'
          size='xl'
          disabled={!isValid || isSubmitting}
          className='mt-53.5 w-full'
        />
      </form>
    </BottomSheet>
  );
};

export default PasswordChangeSheet;
