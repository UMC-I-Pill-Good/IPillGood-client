import SignupContainer from '@/features/signup/components/SignupContainer';
import { Suspense } from 'react';

const SignupPage = () => {
  return (
    <Suspense fallback={null}>
      <SignupContainer />
    </Suspense>
  );
};

export default SignupPage;
