import { TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useState } from 'react';
import { healthStateQuestions } from '@/features/survey/constants/healthState.constants';

const HealthStateStep = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>(
    Object.fromEntries(healthStateQuestions.map((question) => [question.id, ['없음']])),
  );

  const handleSelect = (questionId: string, option: string) => {
    setSelectedOptions((prev) => {
      const current = prev[questionId] ?? [];

      // "없음" 선택 시 다른 옵션 초기화
      if (option === '없음') {
        return { ...prev, [questionId]: current.includes('없음') ? [] : ['없음'] };
      }

      // 다른 옵션 선택 시 "없음" 제거
      const next = current.filter((item) => item !== '없음');

      const updated = next.includes(option)
        ? next.filter((item) => item !== option)
        : [...next, option];

      return {
        ...prev,
        [questionId]: updated.length === 0 ? ['없음'] : updated,
      };
    });
  };

  return (
    <section className='pb-8'>
      <StepHeader title='건강 상태를 알려주세요!' desc='안전한 영양제 추천을 위해 꼭 필요해요.' />

      <div className='space-y-8 mt-2'>
        {healthStateQuestions.map((question, index) => (
          <section key={question.id} className='space-y-2'>
            <h5 className='typo-body-5 ml-1'>
              {index + 1}. {question.title}{' '}
              <span className='text-neutral typo-body-11'>
                (복수 선택 가능) <span className='text-semantic'>*</span>
              </span>
            </h5>

            <div className='flex flex-wrap gap-2 mt-2'>
              {question.options.map((option) => {
                const isSelected = selectedOptions[question.id]?.includes(option);

                return (
                  <TextButton
                    key={option}
                    type='button'
                    text={option}
                    variant={isSelected ? 'secondary' : 'assistive'}
                    size='sm'
                    className='px-4'
                    onClick={() => handleSelect(question.id, option)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default HealthStateStep;
