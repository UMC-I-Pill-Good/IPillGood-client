import { type ConditionSummaryType } from '../types/condition';
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
            className='glass flex h-full w-full min-w-0 flex-col items-center justify-center rounded-xl border-white py-4 px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_4px_4px_0_rgba(126,131,135,0.1)]'
        >
            <div className='flex flex-col items-center gap-2.5'>
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