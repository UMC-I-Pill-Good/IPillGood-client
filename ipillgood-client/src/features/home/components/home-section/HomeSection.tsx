import { HeaderLogoIcon } from '@/assets';
import IntakeSupplementSection from '../intake-supplement-section/IntakeSupplementSection';
import TodayIntakeCheckSection from '../today-intake-check-section/TodayIntakeCheckSection';
import IntakeCalendarSection from '../intake-calendar-section/IntakeCalendarSection';
import GrowthStageSection from '../growth-stage-section/GrowthStageSection';
import RecommendedSupplementSection from '../recommended-supplement-section/RecommendedSupplementSection';

const HomeSection = () => {
  return (
    <>
      <header className='flex items-center w-full h-23'>
        <HeaderLogoIcon className='-ml-4' role='img' aria-label='I Pill Good' />
      </header>
      <IntakeSupplementSection />
      <TodayIntakeCheckSection />
      <IntakeCalendarSection />
      <GrowthStageSection />
      <RecommendedSupplementSection />
    </>
  );
};

export default HomeSection;
