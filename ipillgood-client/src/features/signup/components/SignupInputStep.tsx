import { useAtom } from 'jotai';
import { useState } from 'react';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { inputFields } from '@/features/signup/constants/signup.constants';
import { Input, TextButton } from '@/shared/components';
import { SignupType } from '@/features/signup/schemas/authSchema';
import { getDuplicateCheckId } from '../api/duplicate';
import { isIdDuplicatedAtom } from '../atoms/signup.atom';

interface SignupInputStepProps {
  control: Control<SignupType>;
  register: ReturnType<typeof import('react-hook-form').useForm<SignupType>>['register'];
}

const SignupInputStep = ({ control, register }: SignupInputStepProps) => {
  const { errors } = useFormState({ control });
  const idValue = useWatch({ control, name: 'id' });
  const [isIdDuplicated, setIsIdDuplicated] = useAtom(isIdDuplicatedAtom);

  const [idServerErrorMessage, setIdServerErrorMessage] = useState<string | null>(null);

  const handleDuplicateCheck = async () => {
    if (!idValue.trim()) return;
    try {
      const response = await getDuplicateCheckId(idValue);
      if (response.isSuccess) setIsIdDuplicated(true);
    } catch (error) {
      setIsIdDuplicated(false);
      setIdServerErrorMessage('이미 사용 중인 아이디입니다.');
      console.error(error);
    }
  };

  return (
    <section className='space-y-2 py-4'>
      {inputFields.map((field) => {
        const isIdField = field.name === 'id';
        // id 필드는 서버 메시지가 있으면 그걸 우선, 없으면 zod 메시지
        const idErrorMessage = isIdField
          ? (idServerErrorMessage ?? errors[field.name]?.message)
          : errors[field.name]?.message;

        return (
          <div key={field.name} className='flex gap-2'>
            <Input
              {...register(field.name, {
                onChange: () => {
                  if (isIdField) {
                    setIsIdDuplicated(false);
                    setIdServerErrorMessage(null); // 값 바뀌면 서버 메시지 초기화 -> zod로 복귀
                  }
                },
              })}
              id={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              error={idErrorMessage}
              successMessage={isIdField && isIdDuplicated ? '사용 가능한 아이디입니다.' : undefined}
            />

            {field.isDuplicateCheck && (
              <div className='flex items-center justify-center shrink-0'>
                <TextButton
                  type='button'
                  text='중복 확인'
                  variant='secondary'
                  className='h-10 px-3'
                  disabled={!idValue.trim()}
                  onClick={handleDuplicateCheck}
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
