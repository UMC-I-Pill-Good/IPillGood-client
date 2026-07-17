import { type ConditionSummaryType } from '../types/condition';

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
            <>
                <span className='typo-caption-2'>
                    {value}
                </span>

                <span className='ml-1 font-[var(--font-dm-sans)] typo-caption-7'>
                     h
                </span>
            </>
        );
    }

    if (type === 'intake') {
        return (
            <>
                <span className='typo-caption-2'>
                    {value}
                </span>

                <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em]'>
                    /
                </span>

                <span className='typo-caption-7'>
                    {total} 일
                </span>
            </>
        );
    }

    return (
        <>
            <span className='typo-caption-2'>
                {value}
            </span>

            <span className='mx-1 text-[10px] font-medium leading-[150%] tracking-[-0.011em]'>
                /
            </span>

            <span className='typo-caption-7'>
                {total}
            </span>
        </>
    );
};

export default ConditionSummaryValue;
