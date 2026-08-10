import { TextButton } from '@/shared/components';

interface DashboardSectionHeaderProps {
  title: string;
  href: string;
}

const DashboardSectionHeader = ({ title, href }: DashboardSectionHeaderProps) => {
  return (
    <div className='flex items-center justify-between px-10'>
      <h2 className='text-center text-2xl font-semibold leading-none text-black'>{title}</h2>
      <TextButton
        text='전체 보기'
        href={href}
        variant='primary'
        size='sm'
        className='px-3 shadow-[0_4px_2px_rgba(126,131,135,0.1)]'
      />
    </div>
  );
};

export default DashboardSectionHeader;
