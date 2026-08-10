import { useAtom } from 'jotai';
import { useState } from 'react';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { inputFields } from '@/features/signup/constants/signup.constants';
import { Input, TextButton } from '@/shared/components';
import { SignupType } from '@/features/signup/schemas/authSchema';
import { getDuplicateCheckId } from '../api/duplicate';
import { emailDuplicatedAtom, isIdDuplicatedAtom } from '../atoms/signup.atom';

interface SignupInputStepProps {
  control: Control<SignupType>;
  register: ReturnType<typeof import('react-hook-form').useForm<SignupType>>['register'];
}

const SignupInputStep = ({ control, register }: SignupInputStepProps) => {
  const { errors } = useFormState({ control });
  const idValue = useWatch({ control, name: 'id' });
  const [isIdChecked, setIsIdChecked] = useAtom(isIdDuplicatedAtom);

  const [idServerErrorMessage, setIdServerErrorMessage] = useState<string | null>(null);
  const [emailServerErrorMessage, setEmailServerErrorMessage] = useAtom(emailDuplicatedAtom);

  // 아이디 중복 체크
  const handleIdDuplicateCheck = async () => {
    if (!idValue.trim()) return;

    try {
      const response = await getDuplicateCheckId(idValue);

      if (!response.isSuccess) {
        setIsIdChecked(false);
        setIdServerErrorMessage(response.message ?? '이미 사용 중인 아이디입니다.');
        return;
      }

      setIsIdChecked(true);
      setIdServerErrorMessage(null);
    } catch (error) {
      setIsIdChecked(false);
      setIdServerErrorMessage('이미 사용 중인 아이디입니다.');
      console.error(error);
    }
  };

  return (
    <section className='space-y-2 py-4'>
      {inputFields.map((field) => {
        const errorMessage =
          field.name === 'id'
            ? (idServerErrorMessage ?? errors.id?.message)
            : field.name === 'email'
              ? (emailServerErrorMessage ?? errors.email?.message)
              : errors[field.name]?.message;

        return (
          <div key={field.name} className='flex gap-2'>
            <Input
              {...register(field.name, {
                onChange: () => {
                  if (field.name === 'id') {
                    setIsIdChecked(false);
                    setIdServerErrorMessage(null);
                  }

                  if (field.name === 'email') {
                    setEmailServerErrorMessage(null);
                  }
                },
              })}
              id={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              error={errorMessage}
              successMessage={
                field.name === 'id' && isIdChecked ? '사용 가능한 아이디입니다.' : undefined
              }
            />

            {field.isDuplicateCheck && (
              <div className='flex items-center justify-center shrink-0'>
                <TextButton
                  type='button'
                  text='중복 확인'
                  variant='secondary'
                  className='h-10 px-3'
                  disabled={!idValue.trim()}
                  onClick={handleIdDuplicateCheck}
                />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default SignupInputStep;
