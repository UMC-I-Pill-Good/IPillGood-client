import {
    ConditionIntakeIcon,
    ConditionSleepIcon,
    ConditionVitalityIcon,
} from '@/assets';
import { type ConditionSummaryType } from '../../types/condition';

interface ConditionSummaryIconProps {
    type: ConditionSummaryType;
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

export default ConditionSummaryIcon;
