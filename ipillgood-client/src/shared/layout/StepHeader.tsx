import { memo } from 'react';

const StepHeader = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <header className='py-5 space-y-1.5'>
      <h5 className='text-primary-600 typo-body-4 typo-title-gosanja'>{title}</h5>
      <p className='text-neutral-800 typo-body-11 whitespace-pre-line'>{desc}</p>
    </header>
  );
};

export default memo(StepHeader);
