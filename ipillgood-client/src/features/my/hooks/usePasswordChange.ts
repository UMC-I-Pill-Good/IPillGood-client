import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChangePasswordRequestType } from '../types/member.type';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPassword } from '../api/member';
import { useRouter } from 'next/navigation';
import { passwordSchema } from '../schemas/passwordSchema';
import { showToast } from '@/shared/utils';

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
      showToast.success('비밀번호가 변경됐어요.');
      clearTokens();
      queryClient.clear();
      router.push('/login');
    },
    onError: (error) => {
      const code = isAxiosError<{ code?: string }>(error) ? error.response?.data?.code : undefined;

      if (code === 'MEMBER400_1') {
        showToast.error('현재 비밀번호가 올바르지 않아요.');
        return;
      }

      showToast.error('비밀번호 변경에 실패했어요. 다시 시도해 주세요.');
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
