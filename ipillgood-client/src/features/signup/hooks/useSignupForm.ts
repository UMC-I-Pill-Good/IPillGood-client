// features/signup/hooks/useSignupForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { postSignup } from '../api/signup';
import { isIdDuplicatedAtom } from '../atoms/signup.atom';
import { useAgreementStore } from '../stores/useAgreementStore';

export const useSignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get('step') ?? 1);

  const setIsIdDuplicated = useSetAtom(isIdDuplicatedAtom);
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
      router.push('/signup?step=2');
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
