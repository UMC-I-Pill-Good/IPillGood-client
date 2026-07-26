import { Header } from '@/shared/layout';
import { MOCK_INGREDIENT_DETAIL } from '../mocks/ingredient.mock';
import AlternativeFoodSection from './AlternativeFoodSection';
import IngredientEffectSection from './IngredientEffectSection';
import IngredientInfoGridSection from './IngredientInfoGridSection';
import IngredientSummaryCard from './IngredientSummaryCard';
import AddToIntakeGuideSection from './AddToIntakeGuideSection';

const IngredientSection = () => {
  const {
    ingredientId,
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
  } = MOCK_INGREDIENT_DETAIL;

  return (
    <>
      <Header title={name} />
      <section className='px-5 py-4'>
        <IngredientSummaryCard name={name} imageUrl={imageUrl} description={description} />
        <IngredientEffectSection effects={effects} />
        <IngredientInfoGridSection
          contraindicatedCombinations={contraindicatedCombinations}
          cautions={cautions}
          recommendedIntake={recommendedIntake}
          recommendedIntakeTime={recommendedIntakeTime}
        />
        {hasCabinetProduct ? (
          <AddToIntakeGuideSection ingredientId={ingredientId} />
        ) : (
          <AlternativeFoodSection alternativeFoods={alternativeFoods} name={name} />
        )}
      </section>
    </>
  );
};

export default IngredientSection;
