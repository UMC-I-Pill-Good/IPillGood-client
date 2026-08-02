import { z } from 'zod';

export const signupSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(1, '닉네임은 1자 이상 입력해주세요.')
      .max(10, '닉네임은 10자 이하로 입력해주세요.')
      .regex(/^[가-힣a-zA-Z0-9]+$/, '닉네임은 특수문자와 공백을 사용할 수 없습니다.'),

    id: z
      .string()
      .trim()
      .min(2, '아이디는 2자 이상 입력해주세요.')
      .max(10, '아이디는 10자 이하로 입력해주세요.')
      .regex(/^[a-zA-Z0-9]+$/, '아이디는 특수문자와 공백을 사용할 수 없습니다.'),

    email: z
      .string()
      .trim()
      .min(1, '이메일을 입력해주세요.')
      .email('유효한 이메일 형식이 아닙니다.'),

    password: z
      .string()
      .min(8, '비밀번호는 8자 이상 입력해주세요.')
      .max(16, '비밀번호는 16자 이하로 입력해주세요.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]).{8,16}$/,
        '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
      ),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignupType = z.infer<typeof signupSchema>;
