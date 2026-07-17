import { ConceiveIcon, DrinkingIcon, EatingHabitIcon, SmokingIcon, WorkOutIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useState } from 'react';

const lifestyleOptions = [
  {
    id: 'smoking',
    title: '흡연 여부',
    icon: SmokingIcon,
    options: ['비흡연', '과거 흡연', '현재 흡연'],
    required: true,
  },
  {
    id: 'drinking',
    title: '음주 여부',
    icon: DrinkingIcon,
    options: ['비음주', '가끔 마심', '자주 마심'],
    required: true,
  },
  {
    id: 'eating',
    title: '식습관',
    icon: EatingHabitIcon,
    options: ['혼합', '채식 위주', '육식 위주'],
    required: true,
  },
  {
    id: 'workout',
    title: '운동 빈도',
    icon: WorkOutIcon,
    options: ['거의 안 함', '주 1~2회', '주 3회 이상'],
    required: true,
  },
  {
    id: 'conceive',
    title: '임신 여부',
    icon: ConceiveIcon,
    options: ['아니요', '예'],
    required: false,
  },
];

const LifestyleStep = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleSelect = (id: string, option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: option,
    }));
  };

  return (
    <section className='pb-8 space-y-2'>
      <StepHeader title='생활 습관에 대해 알려주세요!' desc='건강 상태 분석에 참고할게요.' />

      <section className='space-y-2'>
        {lifestyleOptions.map(({ id, title, icon: Icon, options }, index) => (
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
                {index + 1}. {title}
                <span className='text-semantic'> *</span>
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
    </section>
  );
};

export default LifestyleStep;
