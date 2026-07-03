const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='min-h-dvh max-w-110 w-full mx-auto bg-secondary-100'>{children}</div>;
};

export default ProtectedLayout;
