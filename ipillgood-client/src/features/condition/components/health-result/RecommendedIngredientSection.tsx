import { type IngredientSummary } from '../../types/healthStatus';
import RecommendedIngredientCard from './RecommendedIngredientCard';

interface RecommendedIngredientSectionProps {
  ingredientList: IngredientSummary[];
  onIngredientClick?: (ingredientId: number) => void;
}

const RecommendedIngredientSection = ({
  ingredientList,
  onIngredientClick,
}: RecommendedIngredientSectionProps) => {
  const hasRecommendedIngredients = ingredientList.length > 0;

  return (
    <section className='flex min-h-[612px] w-full flex-col items-start gap-2 px-5 py-4 box-border'>
      <h2 className='min-h-6 w-full typo-body-1 text-black leading-none'>
        추천 영양 성분
      </h2>

      {hasRecommendedIngredients ? (
        <div className='flex w-full flex-col gap-2'>
          {ingredientList.map((ingredient) => (
            <RecommendedIngredientCard
              key={ingredient.ingredientId}
              ingredient={ingredient}
              onClick={onIngredientClick}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-1 items-center justify-center p-5 text-center text-neutral-500 typo-body-5'>
          추천 성분 데이터가 존재하지 않습니다.
        </div>
      )}
    </section>
  );
};

export default RecommendedIngredientSection;
