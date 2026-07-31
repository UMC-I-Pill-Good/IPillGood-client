import { StepHeader } from '@/shared/layout';
import BirthYearSection from './BirthYearSection';
import GenderSelectSection from './GenderSelectSection';
import JobSelectSection from './JobSelectSection';
import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';

const BasicInfoStep = () => {
  const router = useRouter();

  return (
    <section className='flex flex-1 flex-col'>
      <StepHeader title='기본 정보를 알려주세요!' desc='나에게 맞는 영양제를 추천해드릴게요.' />
      <BirthYearSection />
      <GenderSelectSection />
      <JobSelectSection />

      <TextButton
        type='button'
        text='다음'
        size='xl'
        className='mt-auto w-full'
        onClick={() => router.push('/survey?step=3')}
      />
    </section>
  );
};

export default BasicInfoStep;
