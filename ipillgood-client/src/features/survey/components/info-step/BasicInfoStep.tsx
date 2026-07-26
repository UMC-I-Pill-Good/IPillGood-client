import { StepHeader } from '@/shared/layout';
import BirthYearSection from './BirthYearSection';
import GenderSelectSection from './GenderSelectSection';
import JobSelectSection from './JobSelectSection';

const BasicInfoStep = () => {
  return (
    <section>
      <StepHeader title='기본 정보를 알려주세요!' desc='나에게 맞는 영양제를 추천해드릴게요.' />
      <BirthYearSection />
      <GenderSelectSection />
      <JobSelectSection />
    </section>
  );
};

export default BasicInfoStep;
