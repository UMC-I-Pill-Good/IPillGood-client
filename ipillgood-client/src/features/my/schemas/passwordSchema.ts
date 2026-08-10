import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),

    newPassword: z
      .string()
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(16, '비밀번호는 16자 이하로 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/,
        '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
      ),

    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['newPasswordConfirm'],
  });
