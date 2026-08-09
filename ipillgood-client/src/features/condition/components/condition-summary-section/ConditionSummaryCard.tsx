import { type ConditionSummaryType } from '../../types/condition';
import ConditionSummaryIcon from './ConditionSummaryIcon';
import ConditionSummaryValue from './ConditionSummaryValue';

interface ConditionSummaryCardProps {
    type: ConditionSummaryType;
    label: string;
    value: number;
    total?: number;
}

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
            className='flex w-full min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-white bg-white/50 px-2 py-2 shadow-[0_4px_4px_0_rgba(126,131,135,0.1)]'
        >
            <div className='flex w-full shrink-0 flex-col items-center gap-2'>
                <p className='typo-caption-2 flex min-h-[29px] items-center justify-center whitespace-pre-wrap text-center text-black !leading-none tracking-normal'>
                    {label}
                </p>

                <div className='flex size-6 shrink-0 items-center justify-center'>
                    <ConditionSummaryIcon type={type} />
                </div>
            </div>

            <div className='flex w-full justify-center whitespace-nowrap text-center tracking-[-0.132px] text-primary-600'>
                <ConditionSummaryValue
                    type={type}
                    value={value}
                    total={total}
                />
            </div>
        </article>
    );
};

export default ConditionSummaryCard;
