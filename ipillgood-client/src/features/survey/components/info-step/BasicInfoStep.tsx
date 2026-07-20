import { StepHeader } from '@/shared/layout';
import { useState } from 'react';
import { TextButton } from '@/shared/components';
import { jobOptions } from '@/features/survey/constants/basicInfo.constants';
import BirthYearSection from './BirthYearSection';
import GenderSelectSection from './GenderSelectSection';

const BasicInfoStep = () => {
  const [selectedJob, setSelectedJob] = useState('');

  return (
    <section>
      <StepHeader title='기본 정보를 알려주세요!' desc='나에게 맞는 영양제를 추천해드릴게요.' />

      <BirthYearSection />

      <GenderSelectSection />

      <section className='pb-4 space-y-2'>
        <h5 className='typo-body-5 ml-1'>
          3. 직군을 선택해주세요. <span className='text-semantic'>*</span>
        </h5>

        <div className='flex flex-wrap items-center gap-2 mt-3'>
          {jobOptions.map((option) => (
            <TextButton
              key={option}
              type='button'
              text={option}
              variant={selectedJob === option ? 'secondary' : 'assistive'}
              size='sm'
              className='px-4'
              onClick={() => setSelectedJob(option)}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default BasicInfoStep;
