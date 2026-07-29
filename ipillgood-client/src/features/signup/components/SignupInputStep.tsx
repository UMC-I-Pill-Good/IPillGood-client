import { useAtom } from 'jotai';
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
  const { errors } = useFormState({ control }); // 이 컴포넌트만 에러 상태 구독
  const idValue = useWatch({ control, name: 'id' }); // watch도 이 컴포넌트로 국한
  const [isIdDuplicated, setIsIdDuplicated] = useAtom(isIdDuplicatedAtom);

  const handleDuplicateCheck = async () => {
    if (!idValue.trim()) return;
    try {
      const response = await getDuplicateCheckId(idValue);
      if (response.isSuccess) setIsIdDuplicated(true);
    } catch (error) {
      setIsIdDuplicated(false);
      console.error(error);
    }
  };

  return (
    <section className='space-y-2 py-4'>
      {inputFields.map((field) => (
        <div key={field.name} className='flex gap-2'>
          <Input
            {...register(field.name, {
              onChange: () => {
                if (field.name === 'id') setIsIdDuplicated(false);
              },
            })}
            id={field.name}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            error={errors[field.name]?.message}
            successMessage={
              field.name === 'id' && isIdDuplicated ? '사용 가능한 아이디입니다.' : undefined
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
                onClick={handleDuplicateCheck}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default SignupInputStep;
