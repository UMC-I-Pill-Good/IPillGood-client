import { useQuery } from '@tanstack/react-query';
import { FetchError, LoadingSpinner, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { getContraindications } from '@/features/survey/api/ingredients';
import { questionLabel } from '@/features/survey/constants/healthState.constants';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { healthStateAtom } from '@/features/survey/atoms/survey.atom';
import { ContraindicationGroup } from '@/features/survey/types/ingredients';

const HealthStateStep = () => {
  const router = useRouter();

  // 건강 상태(금기사항) 목록 조회
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contraindications'],
    queryFn: getContraindications,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const [selectedOptions, setSelectedOptions] = useAtom(healthStateAtom);

  const handleSelect = (groupType: ContraindicationGroup['type'], id: number) => {
    setSelectedOptions((prev) => {
      const current = prev[groupType] ?? [];

      // '없음' 선택 시 해당 그룹 초기화
      if (id === -1) {
        return {
          ...prev,
          [groupType]: [],
        };
      }

      // 선택/해제 토글
      const updated = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      return {
        ...prev,
        [groupType]: updated,
      };
    });
  };

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <FetchError description='건강 상태 정보를 불러오지 못했습니다.' onRetry={() => refetch()} />
    );

  return (
    <section className='flex flex-1 flex-col'>
      <StepHeader title='건강 상태를 알려주세요!' desc='안전한 영양제 추천을 위해 꼭 필요해요.' />

      <div className='mt-2 space-y-8 mb-8'>
        {data?.result?.groups?.map((group, index) => (
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
                  item.id === -1
                    ? (selectedOptions[group.type]?.length ?? 0) === 0
                    : selectedOptions[group.type]?.includes(item.id);

                return (
                  <TextButton
                    key={item.id}
                    type='button'
                    text={item.name}
                    variant={isSelected ? 'secondary' : 'assistive'}
                    size='sm'
                    className='px-4'
                    onClick={() => handleSelect(group.type, item.id)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <TextButton
        type='button'
        text='다음'
        size='xl'
        className='mt-auto w-full'
        onClick={() => router.push('/survey?step=4')}
      />
    </section>
  );
};

export default HealthStateStep;
