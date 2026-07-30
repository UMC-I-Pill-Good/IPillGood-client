import { z } from 'zod';

export const nicknameSchema = z
  .string()
  .regex(
    /^[가-힣a-zA-Z0-9]{1,10}$/,
    '공백을 제외하고 한글/영문/숫자만 1~10자 이내로 입력해주세요.',
  );
