import { Tilt_Warp } from 'next/font/google';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

const LoginPage = () => {
  return (
    <main className='relative isolate p-5 flex flex-col h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#a4befa_0%,#F2F6FF_50%)]'>
      {/* Background */}
      <div
        className='bg-blur absolute top-22 -right-20 h-52 w-52'
        style={{
          background: 'rgba(205, 160, 255,.5)',
          filter: 'blur(70px)',
        }}
      />

      <div
        className='bg-blur absolute -left-22.5 top-75 h-[319.48px] w-[386.21px] rotate-[-26.62deg]'
        style={{
          background: 'rgba(192, 182, 255,.5)',
          filter: 'blur(90px)',
        }}
      />

      {/* Capsule */}
      <div
        className='absolute top-4 left-15 h-[30.73px] w-[114.36px] rotate-[-45.94deg] rounded-full border-y border-white/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute top-25 right-22 h-[30.73px] w-[50.03px] rotate-[56.71deg] rounded-full border-x border-white/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 2px 2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Content */}
    </main>
  );
};

export default LoginPage;
