import { type ConditionSummaryType } from '../../types/condition';

interface ConditionSummaryValueProps {
    type: ConditionSummaryType;
    value: number;
    total?: number;
}

const ConditionSummaryValue = ({
    type,
    value,
    total,
}: ConditionSummaryValueProps) => {
    if (type === 'sleep') {
        return (
            <div className='flex items-baseline justify-center'>
                <span className='typo-caption-2 leading-normal'>
                    {value}
                </span>

                <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7 leading-normal text-neutral-800'>
                     h
                </span>
            </div>
        );
    }

    if (type === 'intake') {
        return (
            <div className='flex items-baseline justify-center'>
                <span className='typo-caption-2 leading-normal'>
                    {value}
                </span>

                <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-800'>
                    /
                </span>

                <span className='typo-caption-7 leading-normal text-neutral-800'>
                    {total} 일
                </span>
            </div>
        );
    }

    return (
        <div className='flex items-baseline justify-center'>
            <span className='typo-caption-2 leading-normal'>
                {value}
            </span>

            <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-800'>
                /
            </span>

            <span className='typo-caption-7 leading-normal text-neutral-800'>
                {total}
            </span>
        </div>
    );
};

export default ConditionSummaryValue;
