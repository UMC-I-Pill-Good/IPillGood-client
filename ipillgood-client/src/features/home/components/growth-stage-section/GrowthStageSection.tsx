import { GROWTH_STAGE_OPTION_LIST } from '../../constants/growthStage.constant';
import { mockIntakeStreak } from '../../mocks/growthStage.mock';
import GrowthStageItem from './GrowthStageItem';

const GrowthStageSection = () => {
  const { streakDays, mascotStage } = mockIntakeStreak;
  const currentIndex = GROWTH_STAGE_OPTION_LIST.findIndex((stage) => stage.value === mascotStage);

  return (
    <section className='mt-4 flex flex-col px-4 py-3 rounded-[20px] bg-white/50 border border-point-600 w-full'>
      <article className='flex flex-col items-center justify-center'>
        <p className='typo-body-5 text-black'>
          연속 섭취 <span className='typo-body-1 text-primary-700'>{streakDays}일째</span>
        </p>
        <p className='typo-caption-2 text-neutral-800 mt-1.5'>
          꾸준함이 쌓여 열매가 맺혀가고 있어요
        </p>
      </article>

      <div className='flex w-full mt-4'>
        {GROWTH_STAGE_OPTION_LIST.map((stage, index) => {
          const status =
            index < currentIndex ? 'PREVIOUS' : index === currentIndex ? 'CURRENT' : 'LOCKED';

          return <GrowthStageItem key={stage.value} stage={stage} status={status} />;
        })}
      </div>
    </section>
  );
};

export default GrowthStageSection;
