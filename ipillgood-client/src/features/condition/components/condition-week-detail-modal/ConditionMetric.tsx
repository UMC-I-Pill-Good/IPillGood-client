import { type ReactNode } from 'react';

interface ConditionMetricProps {
    label: string;
    icon: ReactNode;
    value: ReactNode;
}

const ConditionMetric = ({
  label,
  icon,
  value,
}: ConditionMetricProps) => {
  return (
    <div className='flex h-[69px] w-[55px] shrink-0 flex-col items-center gap-1'>
      <div className='flex h-[45px] w-[55px] flex-col items-center gap-1'>
        <p className='typo-caption-2 flex h-[17px] w-full items-center justify-center whitespace-nowrap text-center text-[#111111]'>
          {label}
        </p>

        <div aria-hidden='true' className='flex size-6 shrink-0 items-center justify-center'>
          {icon}
        </div>
      </div>

      <div className='typo-caption-2 flex h-5 w-full items-baseline justify-center whitespace-nowrap text-center text-[#6580EE]'>
        {value}
      </div>
    </div>
  );
};

export default ConditionMetric;
