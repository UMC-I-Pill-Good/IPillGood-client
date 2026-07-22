import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordChangeSchema } from '../schemas/passwordChangeSchema';
import type { PasswordChangeType } from '../types/passwordChange.type';

export const usePasswordChangeForm = (onOpenChange: (open: boolean) => void) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordChangeType>({
    resolver: zodResolver(passwordChangeSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const onSubmit: SubmitHandler<PasswordChangeType> = (data) => {
    console.log('비밀번호 변경:', data);
    onOpenChange(false);
  };

  return {
    register,
    errors,
    isValid,
    handlePasswordSubmit: handleSubmit(onSubmit),
  };
};
