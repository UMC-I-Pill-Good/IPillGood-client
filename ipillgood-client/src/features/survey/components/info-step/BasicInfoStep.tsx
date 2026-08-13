'use client';

import { StepHeader } from '@/shared/layout';
import BirthYearSection from './BirthYearSection';
import GenderSelectSection from './GenderSelectSection';
import JobSelectSection from './JobSelectSection';
import { TextButton } from '@/shared/components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { genderAtom, selectedJobAtom, selectedDateAtom } from '@/features/survey/atoms/survey.atom';
import { showToast } from '@/shared/utils';

const BasicInfoStep = () => {
  const router = useRouter();
  const returnToParam = useSearchParams().get('returnTo') === '/my' ? '&returnTo=/my' : '';

  const gender = useAtomValue(genderAtom);
  const selectedJob = useAtomValue(selectedJobAtom);
  const selectedDate = useAtomValue(selectedDateAtom);

  const isValid = gender !== null && selectedJob !== '';

  // 다음 단계로 이동
  const handleNext = () => {
    if (!isValid) return;

    if (gender === 'FEMALE') {
      const selected = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 미래 날짜 선택 시 경고 후 이동 중단
      if (selected > today) {
        showToast.error('마지막 생리 시작일은 오늘 이전 날짜로 선택해주세요.');
        return;
      }
    }

    router.push(`/survey?step=2${returnToParam}`);
  };

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
        onClick={handleNext}
      />
    </section>
  );
};

export default BasicInfoStep;
