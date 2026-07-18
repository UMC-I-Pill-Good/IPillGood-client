import type { ComponentType, SVGProps } from 'react';

interface ConditionCheckRowProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

const ConditionCheckRow = ({
  icon: Icon,
  label,
  value,
}: ConditionCheckRowProps) => {
  return (
    <div className='flex h-6 w-full items-center justify-between'>
      {/* Left Group */}
      <div className='flex h-6 items-center gap-2'>
        <div className='relative size-6 shrink-0 flex items-center justify-center'>
          <Icon className='size-6 shrink-0' />
        </div>

        <span className='typo-body-10 text-[#111111]'>
          {label}
        </span>
      </div>

      {/* Right Value */}
      <span className='typo-caption-6 text-neutral-800'>
        {value}
      </span>
    </div>
  );
};

export default ConditionCheckRow;
