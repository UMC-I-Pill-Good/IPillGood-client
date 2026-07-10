import { NavBar } from '@/shared/layout';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto min-h-dvh w-full max-w-110 bg-background pb-16'>
      {children}
      <NavBar />
    </div>
  );
};

export default ProtectedLayout;
