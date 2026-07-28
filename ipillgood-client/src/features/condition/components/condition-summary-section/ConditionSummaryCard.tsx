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
            className='glass flex h-[105px] w-full min-w-0 flex-col items-center justify-center gap-[4px] rounded-xl border-white pt-2 pb-2 px-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_4px_4px_0_rgba(126,131,135,0.1)]'
        >
            {/* 상단 블록: 라벨과 아이콘 */}
            <div className='flex flex-col items-center gap-2 self-stretch shrink-0'>
                <p className='typo-caption-2 flex h-[29px] items-start justify-center whitespace-pre-wrap text-center text-[#111111] !leading-[1.15]'>
                    {label}
                </p>

                <div className='flex size-6 shrink-0 items-center justify-center'>
                    <ConditionSummaryIcon type={type} />
                </div>
            </div>

            {/* 하단 블록: 수치 영역 */}
            <div className='flex h-[13px] items-baseline justify-center whitespace-nowrap text-center text-[#7E8387] typo-caption-2 leading-none'>
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