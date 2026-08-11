'use client';

import { Header } from '@/shared/layout';
import AlternativeFoodSection from './AlternativeFoodSection';
import IngredientEffectSection from './IngredientEffectSection';
import IngredientInfoGridSection from './IngredientInfoGridSection';
import IngredientSummaryCard from './IngredientSummaryCard';
import AddToIntakeGuideSection from './AddToIntakeGuideSection';
import { useParams } from 'next/navigation';
import { useIngredientDetail } from '../hooks/useIngredientDetail';
import AlreadyIntakeSection from './AlreadyIntakeSection';
import { FetchError, LoadingSpinner } from '@/shared/components';

const IngredientSection = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const { data, isLoading, isError } = useIngredientDetail(Number(ingredientId));

  if (isError || (!isLoading && !data)) {
    return (
      <>
        <Header title='영양성분' />
        <FetchError />
      </>
    );
  }

  if (isLoading || !data) {
    return (
      <>
        <Header title='영양성분' />
        <LoadingSpinner />
      </>
    );
  }

  const {
    name,
    hasIntakeProduct,
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
      <section className='px-5 pt-4 pb-24.5 flex-1 flex flex-col'>
        <IngredientSummaryCard name={name} imageUrl={imageUrl} description={description} />
        <IngredientEffectSection effects={effects} />
        <IngredientInfoGridSection
          contraindicatedCombinations={contraindicatedCombinations}
          cautions={cautions}
          recommendedIntake={recommendedIntake}
          recommendedIntakeTime={recommendedIntakeTime}
        />
        {hasIntakeProduct ? (
          <AlreadyIntakeSection name={name} />
        ) : hasCabinetProduct ? (
          <AddToIntakeGuideSection />
        ) : (
          <AlternativeFoodSection alternativeFoods={alternativeFoods} name={name} />
        )}
      </section>
    </>
  );
};

export default IngredientSection;
