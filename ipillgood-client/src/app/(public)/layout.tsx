import { AuthRedirect } from '@/shared/layout';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthRedirect type='public'>
      <div className='mx-auto min-h-dvh w-full max-w-110 bg-background '>{children}</div>
    </AuthRedirect>
  );
};

export default PublicLayout;
