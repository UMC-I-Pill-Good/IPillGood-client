import { NavBar } from '@/shared/layout';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto min-h-dvh w-full max-w-110 bg-background'>
      {children}
      <NavBar />
    </div>
  );
};

export default PublicLayout;

// const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
//   return <div className='mx-auto min-h-dvh w-full max-w-110 bg-background'>{children}</div>;
// };

// export default ProtectedLayout;
