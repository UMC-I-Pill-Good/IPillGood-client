import { AdminUserIcon } from '@/assets';

const DashboardHeader = () => {
  return (
    <header className='flex shrink-0 items-center justify-between bg-white px-5 py-7'>
      <h1 className='text-center text-[28px] font-semibold leading-none text-black'>대시보드</h1>
      <div className='flex shrink-0 items-center gap-1'>
        <div className='flex size-[30px] items-center justify-center rounded-full bg-[#d9d9d9]'>
          <AdminUserIcon aria-hidden='true' className='h-5 w-[15px]' />
        </div>
        <span className='text-center text-lg font-medium leading-none text-neutral'>관리자</span>
      </div>
    </header>
  );
};

export default DashboardHeader;
