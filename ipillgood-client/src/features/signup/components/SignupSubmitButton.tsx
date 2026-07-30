import { Control, useFormState } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { TextButton } from '@/shared/components';
import { SignupType } from '@/features/signup/schemas/authSchema';
import { useIsRequiredChecked } from '../stores/useAgreementStore';
import { isIdDuplicatedAtom } from '../atoms/signup.atom';

interface SignupSubmitButtonProps {
  step: number;
  control: Control<SignupType>;
}

const SignupSubmitButton = ({ step, control }: SignupSubmitButtonProps) => {
  const { isValid } = useFormState({ control });
  const isIdDuplicated = useAtomValue(isIdDuplicatedAtom);
  const isRequiredChecked = useIsRequiredChecked();

  const disabled =
    (step === 1 && (!isValid || !isIdDuplicated)) ||
    (step === 2 && (!isRequiredChecked || !isValid));

  return (
    <TextButton
      type='submit'
      text={step === 1 ? '다음' : '가입 완료'}
      size='xl'
      className='w-full mt-auto mb-2.5'
      disabled={disabled}
    />
  );
};

export default SignupSubmitButton;
