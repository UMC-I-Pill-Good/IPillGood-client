import { HeaderLogoIcon } from '@/assets';
import {
  IntakeCalendarSection,
  IntakeSupplementSection,
  RecommendedSupplementSection,
  TodayIntakeCheckSection,
} from '@/features/home/components';

const HomePage = () => {
  return (
    <div className='flex items-center justify-center flex-col p-5 pb-23'>
      <div className='flex items-center w-full h-23'>
        <HeaderLogoIcon className='-ml-4' />
      </div>
      <IntakeSupplementSection />
      <TodayIntakeCheckSection />
      <IntakeCalendarSection />
      {/* TODO: 연속 섭취 섹션 추가 */}
      <RecommendedSupplementSection />
    </div>
  );
};

export default HomePage;
