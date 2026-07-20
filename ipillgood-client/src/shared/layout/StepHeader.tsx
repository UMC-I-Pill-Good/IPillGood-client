export const StepHeader = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <header className='py-5 space-y-1.5'>
      <h5 className='text-primary-600 typo-body-1'>{title}</h5>
      <p className='text-neutral-800 typo-body-11 whitespace-pre-line'>{desc}</p>
    </header>
  );
};
