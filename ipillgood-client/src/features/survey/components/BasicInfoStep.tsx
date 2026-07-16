import DropdownMenu from '@/shared/components/DropdownMenu';
import { StepHeader } from '@/shared/layout';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const birthYearOptions = [2026, 2025];

const BasicInfoStep = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(2026);

  return (
    <div>
      <StepHeader title='기본 정보를 알려주세요!' desc='나에게 맞는 영양제를 추천해드릴게요.' />

      <section className='py-4 flex flex-col items-start gap-2'>
        <h5 className='typo-body-5'>
          1. 출생 연도를 선택해주세요.<span className='text-semantic'>*</span>
        </h5>

        <div className='flex items-center gap-1'>
          <button
            type='button'
            className='bg-primary/80 inline-flex items-center justify-center gap-1 typo-body-10 rounded-lg pr-3 pl-4 h-8 text-white shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition hover:bg-primary-700 active:bg-primary-800 shirnk-0'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            2026
            <ChevronDown
              className={clsx('transition-transform duration-300', isOpen && 'rotate-180')}
            />
          </button>
          <span className='typo-body-6 text-neutral'>년생</span>
        </div>
      </section>

      <section className='py-4'>
        <h5 className='typo-body-5'>
          2. 성별을 선택해주세요.<span className='text-semantic'>*</span>
        </h5>
      </section>
    </div>
  );
};

export default BasicInfoStep;
