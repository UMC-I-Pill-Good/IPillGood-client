'use client';

import { StepHeader } from '@/shared/layout';
import BirthYearSection from './BirthYearSection';
import GenderSelectSection from './GenderSelectSection';
import JobSelectSection from './JobSelectSection';
import { TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { genderAtom, selectedJobAtom } from '@/features/survey/atoms/survey.atom';

const BasicInfoStep = () => {
  const router = useRouter();

  const gender = useAtomValue(genderAtom);
  const selectedJob = useAtomValue(selectedJobAtom);

  const isValid = gender !== null && selectedJob !== '';

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
        disabled={!isValid}
        className='mt-auto w-full'
        onClick={() => router.push('/survey?step=2')}
      />
    </section>
  );
};

export default BasicInfoStep;
