import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangePasswordRequestType } from '../types/member.type';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPassword } from '../api/member';
import { useRouter } from 'next/navigation';
import { passwordSchema } from '../schemas/passwordSchema';

export const usePasswordChange = (open: boolean, onOpenChange: (open: boolean) => void) => {
  const router = useRouter();
  const { clearTokens } = useLocalStorage();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ChangePasswordRequestType>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const changePasswordMutation = useMutation({
    mutationFn: patchPassword,
    onSuccess: () => {
      onOpenChange(false);
      clearTokens();
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      alert('비밀번호 변경에 실패했습니다.');
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordRequestType> = (data) => {
    changePasswordMutation.mutate(data);
  };

  return {
    register,
    errors,
    isValid,
    isSubmitting: changePasswordMutation.isPending,
    handlePasswordSubmit: handleSubmit(onSubmit),
  };
};
