const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='mx-auto min-h-dvh w-full max-w-110 bg-background'>{children}</div>;
};

export default PublicLayout;
