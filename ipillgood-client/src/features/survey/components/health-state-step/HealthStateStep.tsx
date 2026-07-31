import { useQuery } from '@tanstack/react-query';
import { FetchError, LoadingSpinner, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { useState } from 'react';
import { getContraindications } from '@/features/survey/api/ingredients';
import { questionLabel } from '@/features/survey/constants/healthState.constants';

const HealthStateStep = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contraindications'],
    queryFn: getContraindications,
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  const handleSelect = (groupType: string, option: string) => {
    setSelectedOptions((prev) => {
      const current = prev[groupType] ?? ['없음'];

      // "없음" 선택 시 다른 옵션 초기화
      if (option === '없음') {
        return {
          ...prev,
          [groupType]: current.includes('없음') ? [] : ['없음'],
        };
      }

      // 다른 옵션 선택 시 "없음" 제거
      const next = current.filter((item) => item !== '없음');

      const updated = next.includes(option)
        ? next.filter((item) => item !== option)
        : [...next, option];

      return {
        ...prev,
        [groupType]: updated.length === 0 ? ['없음'] : updated,
      };
    });
  };

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <FetchError description='건강 상태 정보를 불러오지 못했습니다.' onRetry={() => refetch()} />
    );

  return (
    <section className='pb-8'>
      <StepHeader title='건강 상태를 알려주세요!' desc='안전한 영양제 추천을 위해 꼭 필요해요.' />

      <div className='mt-2 space-y-8'>
        {data?.result.groups.map((group, index) => (
          <section key={group.type} className='space-y-2'>
            <h5 className='typo-body-5 ml-1'>
              {index + 1}. {questionLabel[group.type]}{' '}
              <span className='text-neutral typo-body-11'>
                (복수 선택 가능) <span className='text-semantic'>*</span>
              </span>
            </h5>

            <div className='mt-2 flex flex-wrap gap-2'>
              {[
                { id: -1, name: '없음' },
                ...group.items.map((item) => ({
                  id: item.contraindicationId,
                  name: item.conditionName,
                })),
              ].map((item) => {
                const isSelected =
                  selectedOptions[group.type]?.includes(item.name) ?? item.name === '없음';

                return (
                  <TextButton
                    key={item.id}
                    type='button'
                    text={item.name}
                    variant={isSelected ? 'secondary' : 'assistive'}
                    size='sm'
                    className='px-4'
                    onClick={() => handleSelect(group.type, item.name)}
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
