import { LogoSection } from './ui/LogoSection';
import { Background } from './ui/Background';
import LoginSection from '@/features/login/components/LoginSection';

const LoginPage = () => {
  return (
    <main className='relative isolate p-5 flex flex-col min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#C0CCFF_0%,#fcfcfc_50%)]'>
      {/* Background */}
      <Background />

      {/* Content */}
      <LogoSection />
      <LoginSection />
    </main>
  );
};

export default LoginPage;
