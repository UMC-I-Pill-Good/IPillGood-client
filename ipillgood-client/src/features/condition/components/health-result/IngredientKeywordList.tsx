import { Chip } from '@/shared/components';

interface IngredientKeywordListProps {
  ingredientId: number;
  keywordList: string[];
}

/**
 * 추천 성분별 효능 키워드 목록 컴포넌트 (목록의 flex-wrap 배치 담당)
 */
const IngredientKeywordList = ({
  ingredientId,
  keywordList,
}: IngredientKeywordListProps) => {
  if (!keywordList || keywordList.length === 0) {
    return null;
  }

  return (
    <div className='flex w-full flex-wrap items-center gap-1 box-border'>
      {keywordList.map((keyword, index) => (
        <Chip
          key={`${ingredientId}-${keyword}-${index}`}
          text={keyword}
          variant='point'
          className='shadow-[0_4px_4px_rgba(126,131,135,0.1)]'
        />
      ))}
    </div>
  );
};

export default IngredientKeywordList;
