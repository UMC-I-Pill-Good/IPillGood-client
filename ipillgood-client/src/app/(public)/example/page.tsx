import IconButton from '@/shared/components/button/IconButton';
import { ChevronLeft, X } from 'lucide-react';

const ExamplePage = () => {
  return (
    <div className='p-4 flex flex-col gap-4'>
      <IconButton icon={<ChevronLeft size={26} />} />
      <IconButton icon={<X size={22} />} disabled={true} />
    </div>
  );
};

export default ExamplePage;
