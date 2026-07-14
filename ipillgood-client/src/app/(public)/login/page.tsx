'use client';

import { motion } from 'framer-motion';

import LoginForm from '@/features/login/components/LoginForm';
import { LogoSection } from './ui/LogoSection';
import { Background } from './ui/Background';

const LoginPage = () => {
  return (
    <main className='relative isolate p-5 flex flex-col h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#a4befa_0%,#F2F6FF_50%)]'>
      {/* Background */}
      <Background />

      {/* Logo */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <LogoSection />
      </motion.div>

      {/* Login Form */}

      <LoginForm />
    </main>
  );
};

export default LoginPage;
