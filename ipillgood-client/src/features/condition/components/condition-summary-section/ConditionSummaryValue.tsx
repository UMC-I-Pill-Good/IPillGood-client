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
                <span className='typo-caption-2'>
                    {value}
                </span>

                <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7 text-neutral-600'>
                     h
                </span>
            </div>
        );
    }

    if (type === 'intake') {
        return (
            <div className='flex items-baseline justify-center'>
                <span className='typo-caption-2'>
                    {value}
                </span>

                <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                    /
                </span>

                <span className='typo-caption-7 text-neutral-600'>
                    {total}일
                </span>
            </div>
        );
    }

    return (
        <div className='flex items-baseline justify-center'>
            <span className='typo-caption-2'>
                {value}
            </span>

            <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em] text-neutral-500'>
                /
            </span>

            <span className='typo-caption-7 text-neutral-600'>
                {total}
            </span>
        </div>
    );
};

export default ConditionSummaryValue;
