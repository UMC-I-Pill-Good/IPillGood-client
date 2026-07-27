// 작업 하실 때 아래 주석에 맞게 레이아웃 추가해주시고 해당 주석처리들은 제거해주세요.

// import AdminHeader from '@/shared/layout'
// import AdminSidebar from '@/shared/layout';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto min-h-dvh w-full max-w-7xl bg-background'>
      {/*AdminHeader  */}

      {children}

      {/*AdminSidebar  */}
    </div>
  );
};

export default AdminLayout;
