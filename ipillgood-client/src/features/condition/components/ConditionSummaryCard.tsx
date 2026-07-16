import {
    ConditionIntakeIcon,
    ConditionSleepIcon,
    ConditionVitalityIcon,
} from '@/assets';
import { type ConditionSummaryType } from '../types/condition';

interface ConditionSummaryCardProps {
    type: ConditionSummaryType;
    label: string;
    value: number;
    total?: number;
}

interface ConditionSummaryIconProps {
    type: ConditionSummaryType;
}

interface ConditionSummaryValueProps {
    type: ConditionSummaryType;
    value: number;
    total?: number;
}

const ConditionSummaryIcon = ({
    type,
}: ConditionSummaryIconProps) => {
    if (type === 'vitality') {
        return (
            <ConditionVitalityIcon
                aria-hidden='true'
                className='block h-[19.31px] w-4 shrink-0'
            />
        );
    }

    if (type === 'sleep') {
        return (
            <ConditionSleepIcon
                aria-hidden='true'
                className='block h-5 w-[12.93px] shrink-0'
            />
        );
    }

    return (
        <ConditionIntakeIcon
            aria-hidden='true'
            className='block h-5 w-[18px] shrink-0'
        />
    );
};

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

const ConditionSummaryCard = ({
    type,
    label,
    value,
    total,
}: ConditionSummaryCardProps) => {
    const valueText =
        type === 'sleep'
            ? `${value}시간`
            : `${value}/${total}${type === 'intake' ? '일' : ''}`;

    return (
        <article
            aria-label={`${label} ${valueText}`}
            className='glass flex h-full w-full min-w-0 flex-col items-center justify-center rounded-xl border-white p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_4px_4px_0_rgba(126,131,135,0.1)]'
        >
            <div className='flex flex-col items-center gap-1'>
                <p className='typo-caption-2 flex items-center justify-center whitespace-nowrap text-center text-[#111111]'>
                    {label}
                </p>

                <div className='flex size-6 shrink-0 items-center justify-center'>
                    <ConditionSummaryIcon type={type} />
                </div>

                <div className='flex items-center justify-center whitespace-nowrap text-center text-neutral-800'>
                    <ConditionSummaryValue
                        type={type}
                        value={value}
                        total={total}
                    />
                </div>
            </div>
        </article>
    );
};

export default ConditionSummaryCard;