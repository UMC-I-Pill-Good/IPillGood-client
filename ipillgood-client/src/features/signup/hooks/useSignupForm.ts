import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { postSignup } from '../api/signup';
import { getDuplicateCheckEmail } from '../api/duplicate';
import { isIdDuplicatedAtom, emailDuplicatedAtom } from '../atoms/signup.atom';
import { useAgreementStore } from '../stores/useAgreementStore';

export const useSignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step') ?? 1);

  const setIsIdDuplicated = useSetAtom(isIdDuplicatedAtom);
  const setEmailServerErrorMessage = useSetAtom(emailDuplicatedAtom);
  const checked = useAgreementStore((s) => s.checked);

  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: { nickname: '', id: '', email: '', password: '', passwordConfirm: '' },
  });

  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }
    router.push('/signup?step=1');
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (step === 1) {
      try {
        const response = await getDuplicateCheckEmail(data.email);

        if (!response.isSuccess) {
          setEmailServerErrorMessage(response.message ?? '이미 사용 중인 이메일입니다.');
          return; // 중복이면 다음 스텝으로 넘어가지 않음
        }

        setEmailServerErrorMessage(null);
        router.push('/signup?step=2');
      } catch (err) {
        console.error(err);
        setEmailServerErrorMessage('이미 사용 중인 이메일입니다.');
      }
      return;
    }

    try {
      const request = {
        nickname: data.nickname,
        username: data.id,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        policyAgreements: [
          { policyDocumentId: 1, agreed: checked.terms },
          { policyDocumentId: 2, agreed: checked.privacy },
          { policyDocumentId: 3, agreed: checked.health },
          { policyDocumentId: 4, agreed: checked.marketing },
        ],
      };

      await postSignup(request);
      router.push('/signup?step=3');
    } catch (err) {
      console.error(err);
    }
  });

  const resetIdCheck = () => setIsIdDuplicated(false);

  return {
    step,
    control: form.control,
    register: form.register,
    handleBack,
    onSubmit,
    resetIdCheck,
  };
};
