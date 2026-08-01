'use client';

import { Header } from '@/shared/layout';
import AlternativeFoodSection from './AlternativeFoodSection';
import IngredientEffectSection from './IngredientEffectSection';
import IngredientInfoGridSection from './IngredientInfoGridSection';
import IngredientSummaryCard from './IngredientSummaryCard';
import AddToIntakeGuideSection from './AddToIntakeGuideSection';
import { useParams } from 'next/navigation';
import { useIngredientDetail } from '../hooks/useIngredientDetail';

const IngredientSection = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const { data, isLoading, isError } = useIngredientDetail(Number(ingredientId));

  if (isError || (!isLoading && !data)) {
    // 임시 UI
    return (
      <>
        <Header title='영양성분' />
        <p className='px-5 py-10 text-center typo-body-10 text-neutral-800'>
          성분 정보를 불러오지 못했습니다.
        </p>
      </>
    );
  }

  if (isLoading || !data) {
    // 임시 UI
    return (
      <>
        <Header title='영양성분' />
        <p className='px-5 py-10 text-center typo-body-10 text-neutral-800'>불러오는 중...</p>
      </>
    );
  }

  const {
    name,
    imageUrl,
    description,
    effects,
    contraindicatedCombinations,
    cautions,
    recommendedIntake,
    recommendedIntakeTime,
    hasCabinetProduct,
    alternativeFoods,
  } = data;

  return (
    <>
      <Header title={name} />
      <section className='px-5 pt-4 pb-22 flex-1 flex flex-col'>
        <IngredientSummaryCard name={name} imageUrl={imageUrl} description={description} />
        <IngredientEffectSection effects={effects} />
        <IngredientInfoGridSection
          contraindicatedCombinations={contraindicatedCombinations}
          cautions={cautions}
          recommendedIntake={recommendedIntake}
          recommendedIntakeTime={recommendedIntakeTime}
        />
        {hasCabinetProduct ? (
          <AddToIntakeGuideSection ingredientId={Number(ingredientId)} />
        ) : (
          <AlternativeFoodSection alternativeFoods={alternativeFoods} name={name} />
        )}
      </section>
    </>
  );
};

export default IngredientSection;
