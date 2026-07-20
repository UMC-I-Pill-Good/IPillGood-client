'use client';

import { jobOptions } from '@/features/survey/constants/basicInfo.constants';
import { TextButton } from '@/shared/components';
import { useAtom } from 'jotai';
import { selectedJobAtom } from '@/features/survey/atoms/survey.atom';

const JobSelectSection = () => {
  const [selectedJob, setSelectedJob] = useAtom(selectedJobAtom);

  return (
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
  );
};

export default JobSelectSection;
