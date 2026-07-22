import { type IngredientSummary } from '../../types/healthStatus';
import { Omega3BottleIcon } from '@/assets';
import { Chip } from '@/shared/components';
import { ChevronRight } from 'lucide-react';
import IngredientKeywordList from './IngredientKeywordList';
import { clsx } from 'clsx';

interface RecommendedIngredientCardProps {
  ingredient: IngredientSummary;
  onClick?: (ingredientId: number) => void;
}

/**
 * 추천 영양 성분 카드 컴포넌트
 */
const RecommendedIngredientCard = ({
  ingredient,
  onClick,
}: RecommendedIngredientCardProps) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(ingredient.ingredientId);
    }
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? handleCardClick : undefined}
      className={clsx(
        'glass !h-auto !w-full !flex !whitespace-normal items-start gap-3 rounded-[20px] !bg-[rgba(127,153,255,0.28)] px-5 py-4 box-border transition-all',
        onClick && 'cursor-pointer hover:bg-[rgba(127,153,255,0.2)]',
      )}
    >
      {/* 1. 성분 이미지 영역 (omega3-bottle 임시 사용) */}
      <div className='flex w-[54px] shrink-0 items-center justify-center self-center overflow-visible'>
        <Omega3BottleIcon className='h-[80px] w-[54px] object-contain overflow-visible' />
      </div>

      {/* 2. 우측 상세 정보 영역 */}
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        {/* 상단 정보 그룹 */}
        <div className='flex min-w-0 flex-col items-start gap-1 w-full'>
          {/* 캐비닛 내 존재 배지 */}
          {ingredient.inCabinet && (
            <Chip
              text='캐비닛 내 존재'
              variant='point'
              className='bg-secondary-600 shadow-[0_4px_4px_rgba(126,131,135,0.1)] text-white typo-caption-6 h-6 px-3 mb-1'
            />
          )}

          {/* 성분명과 추천 이유 텍스트 영역에만 왼쪽 들여쓰기 pl-1 부여 */}
          <div className='flex min-w-0 flex-col items-start gap-2 w-full pl-1'>
            {/* 성분명 행 */}
            <div className='flex min-h-[21px] w-full min-w-0 items-center justify-between'>
              <h3 className='min-w-0 typo-body-5 text-black truncate leading-none'>
                {ingredient.name}
              </h3>
              <span className='flex h-[21px] w-[22px] shrink-0 items-center justify-center'>
                <ChevronRight
                  aria-hidden='true'
                  className='size-5 text-neutral-800'
                />
              </span>
            </div>

            {/* 추천 이유 */}
            <div className='flex min-w-0 flex-col items-start gap-1 w-full'>
              <span className='w-full typo-body-10 text-primary-700 leading-none'>
                추천 이유
              </span>
              <p className='w-full whitespace-pre-line break-keep typo-caption-7 text-black leading-normal'>
                {ingredient.description}
              </p>
            </div>
          </div>
        </div>

        {/* 3. 효능 키워드 칩 목록 (들여쓰기 없이 원래 자리 유지) */}
        <IngredientKeywordList
          ingredientId={ingredient.ingredientId}
          keywordList={ingredient.effectKeywords}
        />
      </div>
    </div>
  );
};

export default RecommendedIngredientCard;
