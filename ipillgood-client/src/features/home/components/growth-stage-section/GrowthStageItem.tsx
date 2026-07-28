import { GrowthStageOptionType, GrowthStageStatusType } from '../../types/growthStage.type';
import { Chip } from '@/shared/components';
import { LockPointIcon } from '@/assets';

interface GrowthStageItemProps {
  stage: GrowthStageOptionType;
  status: GrowthStageStatusType;
}

const GrowthStageItem = ({ stage, status }: GrowthStageItemProps) => {
  const { label, icon: Icon, lockedIcon: LockedIcon, dayRangeText } = stage;
  const isLocked = status === 'LOCKED';
  const StageIcon = isLocked ? (LockedIcon ?? Icon) : Icon;

  return (
    <div className='flex flex-col justify-end items-center h-32.75 w-1/5'>
      <StageIcon aria-hidden='true' />
      {isLocked ? (
        <span
          className={`w-6.25 h-6.25 rounded-full bg-point-300 flex justify-center items-center mt-1 mb-7.5 ${stage.value === 'FRUIT' ? 'mr-1' : ''}`}
        >
          <LockPointIcon aria-hidden='true' />
          <span className='sr-only'>{`${label} 단계 (${dayRangeText}), 잠금`}</span>
        </span>
      ) : (
        <div
          className={`typo-caption-6 flex flex-col items-center leading-tight! ${stage.value === 'FRUIT' ? 'mr-2.5' : ''}`}
        >
          <span className='text-black mt-1'>{label}</span>
          <span className='text-point-900'>{dayRangeText}</span>
          <div className='h-5.25 mt-1'>
            {status === 'CURRENT' && (
              <Chip variant='point' className='px-[7.5px] h-full' text='현재 단계' />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthStageItem;
