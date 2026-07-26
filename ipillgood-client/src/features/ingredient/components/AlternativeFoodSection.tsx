'use client';

import { useRouter } from 'next/navigation';
import { TextButton } from '@/shared/components';
import { AlternativeFoodType } from '../types/ingredient';
import AlternativeFoodCard from './AlternativeFoodCard';

interface AlternativeFoodSectionProps {
  alternativeFoods: AlternativeFoodType[];
  name: string;
}

const AlternativeFoodSection = ({ alternativeFoods, name }: AlternativeFoodSectionProps) => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push(`/ranking/result?search=${encodeURIComponent(name)}`);
  };

  return (
    <section>
      <h2 className='typo-body-1 text-black'>대체 음식 추천</h2>

      <div className='mt-2 typo-caption-6'>
        <p className=' text-neutral-800 leading-4'>
          해당 성분과 관련된 영양제를 보유하고 있지 않나요?
        </p>
        <p className='text-point-900 leading-4'>해당 성분을 섭취할 수 있는 음식을 추천드릴게요!</p>
      </div>

      {/* TODO: 개수에 따라 스타일 조정 필요 */}
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {alternativeFoods.map((food) => (
          <AlternativeFoodCard key={food.name} title={food.name} desc={food.contentPer100g} />
        ))}
      </div>

      <TextButton
        type='button'
        variant='primary'
        size='xl'
        text='관련 영양제 검색하러 가기'
        className='w-full mt-4'
        onClick={handleSearchClick}
      />
    </section>
  );
};

export default AlternativeFoodSection;
