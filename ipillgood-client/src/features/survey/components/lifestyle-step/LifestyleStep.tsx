import { TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useAtom, useAtomValue } from 'jotai';
import { genderAtom, lifestyleAtom } from '@/features/survey/atoms/survey.atom';
import { lifestyleOptions } from '@/features/survey/constants/lifestyle.constants';
import { useRouter } from 'next/navigation';

const LifestyleStep = () => {
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useAtom(lifestyleAtom);
  const gender = useAtomValue(genderAtom);

  const handleSelect = (id: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: option,
    }));
  };

  return (
    <section className='space-y-2 flex flex-1 flex-col'>
      <StepHeader title='생활 습관에 대해 알려주세요!' desc='건강 상태 분석에 참고할게요.' />

      <section className='space-y-2'>
        {lifestyleOptions
          .filter((item) => item.id !== 'conceive' || gender === 'woman')
          .map(({ id, title, icon: Icon, options, required }, index) => (
            <article
              key={id}
              className='bg-white/50 px-5 py-4 no-center-glass rounded-[20px] min-h-26 flex items-center gap-4'
            >
              {/* Icon */}
              <div className='flex items-center justify-center min-w-20 h-20 bg-secondary-200 rounded-full'>
                <Icon />
              </div>

              {/* Content */}
              <div className='flex flex-col gap-2'>
                <h5 className='typo-body-6'>
                  {index + 1}. {title} {required && <span className='text-semantic'>*</span>}
                </h5>

                <div className='flex flex-wrap items-center gap-2'>
                  {options.map((option) => (
                    <TextButton
                      key={option}
                      type='button'
                      text={option}
                      size='sm'
                      variant={selectedOptions[id] === option ? 'secondary' : 'outline'}
                      onClick={() => handleSelect(id, option)}
                      className='w-25'
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
      </section>

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

export default LifestyleStep;
