import { AuthRedirect, NavBar } from '@/shared/layout';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirect type='protected'>
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background'>
        {children}
        <NavBar />
      </div>
    </AuthRedirect>
  );
};

export default ProtectedLayout;
