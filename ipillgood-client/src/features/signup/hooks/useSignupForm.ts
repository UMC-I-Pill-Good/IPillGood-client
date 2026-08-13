import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { postSignup } from '../api/signup';
import { getDuplicateCheckEmail } from '../api/duplicate';
import { emailDuplicatedAtom } from '../atoms/signup.atom';
import { useAgreementStore } from '../stores/useAgreementStore';
import { useSignupDraftStore } from '../stores/useSignupDraftStore';
import { useCallback, useEffect } from 'react';
import { showToast } from '@/shared/utils';

export const useSignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsedStep = Number(searchParams.get('step'));
  const step = [1, 2, 3].includes(parsedStep) ? parsedStep : 1;

  const setEmailServerErrorMessage = useSetAtom(emailDuplicatedAtom);
  const checked = useAgreementStore((s) => s.checked);
  const signupDraft = useSignupDraftStore.getState().draft;
  const setSignupDraft = useSignupDraftStore((state) => state.setDraft);

  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: signupDraft,
  });
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    setSignupDraft({
      nickname: formValues.nickname ?? '',
      id: formValues.id ?? '',
      email: formValues.email ?? '',
      password: formValues.password ?? '',
      passwordConfirm: formValues.passwordConfirm ?? '',
    });
  }, [formValues, setSignupDraft]);

  const handleBack = useCallback(() => {
    if (step === 1) {
      useSignupDraftStore.getState().resetDraft();
      router.push('/login');
      return;
    }

    router.back();
  }, [step, router]);

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
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

      const response = await postSignup(request);

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      useAgreementStore.getState().reset();
      useSignupDraftStore.getState().resetDraft();
      showToast.success('회원가입에 성공했어요.');
      router.push('/signup?step=3');
    } catch (err) {
      console.error(err);
      showToast.error('회원가입에 실패했어요. 다시 시도해 주세요.');
      router.push('/signup?step=1');
    }
  });

  return {
    step,
    control: form.control,
    register: form.register,
    handleBack,
    onSubmit,
  };
};
