import {
  ConditionScore1Icon,
  ConditionScore2Icon,
  ConditionScore3Icon,
  ConditionScore4Icon,
  ConditionScore5Icon,
} from '@/assets';
import { clsx } from 'clsx';
import { type VitalityOption } from '../../constants/conditionPopup';

interface VitalityOptionButtonProps {
  option: VitalityOption;
  isSelected: boolean;
  onSelectScore: (score: number) => void;
}

const VitalityOptionButton = ({
  option,
  isSelected,
  onSelectScore,
}: VitalityOptionButtonProps) => {
  const { score, label } = option;

  const handleSelect = () => {
    onSelectScore(score);
  };

  const renderIcon = () => {
    switch (score) {
      case 1:
        return <ConditionScore1Icon className='size-5 shrink-0' />;
      case 2:
        return <ConditionScore2Icon className='size-5 shrink-0' />;
      case 3:
        return <ConditionScore3Icon className='size-5 shrink-0' />;
      case 4:
        return <ConditionScore4Icon className='size-5 shrink-0' />;
      case 5:
        return <ConditionScore5Icon className='size-5 shrink-0' />;
      default:
        return <ConditionScore3Icon className='size-5 shrink-0' />;
    }
  };

  return (
    <button
      type='button'
      aria-label={`${score}점 ${label}`}
      onClick={handleSelect}
      className={clsx(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-2 transition-transform duration-200 active:scale-95',
        isSelected && 'scale-105',
      )}
    >
      <span
        className={clsx(
          'flex size-[34px] items-center justify-center rounded-full pt-2 px-[7px] pb-[6px] transition-all duration-200 shadow-sm',
          isSelected
            ? 'scale-110 border-2 border-[#92E4C2] bg-white text-[#92E4C2] [&_path]:fill-[#92E4C2] shadow-md'
            : 'bg-[#92E4C2] text-white [&_path]:fill-white',
        )}
      >
        {renderIcon()}
      </span>

      <span className='flex w-full flex-col items-center gap-1' style={{ fontFamily: 'Pretendard, sans-serif' }}>
        <span className='typo-caption-6 text-center text-[#111111] leading-none'>
          {score}
        </span>

        <span className='typo-caption-7 w-full whitespace-nowrap text-center text-[#111111] leading-3'>
          {label}
        </span>
      </span>
    </button>
  );
};

export default VitalityOptionButton;
