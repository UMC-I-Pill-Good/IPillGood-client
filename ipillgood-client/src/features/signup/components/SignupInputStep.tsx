import { inputFields } from '@/features/signup/constants/signup.constants';
import clsx from 'clsx';
import { Input, TextButton } from '@/shared/components';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupType } from '@/features/signup/schemas/authSchema';

interface SignupInputStepProps {
  register: UseFormRegister<SignupType>;
  errors: FieldErrors<SignupType>;
  idValue: string;
  isIdDuplicated: boolean;
  onDuplicateCheck: () => void;
  onIdChange: () => void;
}

const SignupInputStep = ({
  register,
  errors,
  idValue,
  isIdDuplicated,
  onDuplicateCheck,
  onIdChange,
}: SignupInputStepProps) => {
  return (
    <section className='space-y-2 py-4'>
      {inputFields.map((field) => (
        <div key={field.name} className='flex gap-2'>
          <Input
            {...register(field.name, {
              onChange: () => {
                if (field.name === 'id') {
                  onIdChange();
                }
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
                className={clsx('h-10 px-4', !errors[field.name] || !(isIdDuplicated && ''))}
                disabled={!idValue.trim()}
                onClick={onDuplicateCheck}
              />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default SignupInputStep;
